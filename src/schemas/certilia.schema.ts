import { z } from 'zod';

/**
 * Userinfo response from Certilia's OIDC `/userinfo` endpoint.
 *
 * Certilia returns the standard OIDC claim set (`sub`, `email`, names,
 * address, phone) plus a few custom Croatian eID claims (OIB/PIN,
 * national identity document fields). Which claims actually arrive is
 * controlled per-client at the Certilia portal under "User data your
 * application want to receive" — fields toggled off there are simply
 * absent from the response, hence almost everything below is optional.
 *
 * `oib` is accepted under any of the names Certilia is known to use
 * across its tenants (`oib`, `pin`, `oib_pin`); we normalise to a single
 * `oib` field via the schema's transform. Without an OIB OR an email we
 * cannot map the identity to an existing Flatie user, so the matching
 * logic in `auth.ts` rejects.
 */
const oibValueSchema = z
  .string()
  .trim()
  .regex(/^\d{11}$/, 'OIB must be 11 digits')
  .optional();

export const certiliaUserinfoSchema = z
  .object({
    sub: z.string().min(1),
    email: z.string().email().optional(),
    email_verified: z.boolean().optional(),
    name: z.string().optional(),
    given_name: z.string().optional(),
    family_name: z.string().optional(),
    phone_number: z.string().optional(),
    address: z
      .union([z.string(), z.object({ formatted: z.string().optional() }).passthrough()])
      .optional(),
    // Custom Croatian eID claims — Certilia exposes OIB under a couple of
    // different names depending on tenant configuration. Accept any.
    oib: oibValueSchema,
    pin: oibValueSchema,
    oib_pin: oibValueSchema,
  })
  .passthrough()
  .transform((profile) => {
    const oib = profile.oib ?? profile.pin ?? profile.oib_pin ?? undefined;
    const fullName =
      profile.name ??
      [profile.given_name, profile.family_name].filter(Boolean).join(' ').trim() ??
      undefined;
    return {
      sub: profile.sub,
      email: profile.email?.toLowerCase().trim(),
      emailVerified: profile.email_verified ?? false,
      name: fullName || undefined,
      givenName: profile.given_name,
      familyName: profile.family_name,
      phoneNumber: profile.phone_number,
      oib,
      raw: profile as Record<string, unknown>,
    };
  });

export type CertiliaUserinfo = z.infer<typeof certiliaUserinfoSchema>;
