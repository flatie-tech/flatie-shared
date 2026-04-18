import { z } from 'zod';

/**
 * Zod preprocessor for array fields arriving through multipart/form-data.
 *
 * When a form posts an array field via multipart, the browser or form
 * serializer can send one of four shapes — none of which are raw arrays
 * on the server side:
 *
 *   - real array (e.g. after Fastify multipart already parsed it)
 *   - JSON-encoded string `'["a","b"]'` (manual form.append of
 *     JSON.stringify)
 *   - a single string `'a'` (one append call)
 *   - an empty string `''` (absent field submitted as blank)
 *
 * Normalizes all four into a plain array before handing off to the
 * inner schema's validation. Mirrors the behavior of the class-transformer
 * `@Transform` hooks that wrapped every `options` / `fileIds` /
 * `scopedUnitIds` / etc. field on the legacy DTOs.
 *
 * Leaves `undefined` / `null` unchanged so the caller can `.optional()`
 * the whole thing and have it skip when the field is absent.
 */
export function multipartArray<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.preprocess((value) => {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return value;
    const trimmed = value.trim();
    if (trimmed === '') return [];
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [value];
      } catch {
        return [value];
      }
    }
    return [value];
  }, z.array(itemSchema));
}

/**
 * Zod preprocessor for boolean fields arriving through multipart/form-data.
 *
 * Multipart posts booleans as strings (`'true'` / `'false'`) or bare
 * checkbox state. Accepts these plus real booleans; everything else
 * falls through untouched so the inner schema can reject it.
 */
export function multipartBoolean() {
  return z.preprocess((value) => {
    if (typeof value === 'boolean') return value;
    if (value === 'true') return true;
    if (value === 'false' || value === '' || value == null) return false;
    return value;
  }, z.boolean());
}
