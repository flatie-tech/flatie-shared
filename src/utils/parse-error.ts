import { type BackendErrorCode, isBackendErrorCode } from '../errors';

/**
 * Parsed shape of an API error.
 *
 * - `code`:   A validated {@link BackendErrorCode} when the backend returned
 *             a `code` field on the error response and it matches a known
 *             domain code. `null` otherwise (legacy endpoint, network error,
 *             unknown code string, etc.).
 * - `message`: A human-readable fallback message. Prefers the backend's
 *             `response.data.message`, then the JS `Error.message`, and
 *             finally a generic `'Unknown error'` string.
 * - `status`:  The HTTP status code if the error originated from an Axios
 *             response; `null` otherwise.
 */
export interface ParsedApiError {
  code: BackendErrorCode | null;
  message: string;
  status: number | null;
}

/**
 * Safely read a property off an unknown value without throwing.
 */
const readProp = (value: unknown, key: string): unknown => {
  if (value !== null && typeof value === 'object' && key in value) {
    return (value as Record<string, unknown>)[key];
  }
  return undefined;
};

/**
 * Extract a domain error code and message from an arbitrary caught error.
 *
 * Designed for use in `catch` blocks around API calls. Never throws — on
 * completely unrecognizable input it returns
 * `{ code: null, message: 'Unknown error', status: null }`.
 *
 * Pure function; no axios coupling. Walks `error.response.data.{code,message}`
 * which matches the shape every Flatie HTTP client (axios on web/mobile,
 * fetch wrappers on the server) produces.
 *
 * @example
 * try {
 *   await apiClient.post('/buildings/123/join-requests', payload);
 * } catch (err) {
 *   const { code, message } = parseApiError(err);
 *   if (code === BACKEND_ERROR_CODES.USER_ALREADY_MEMBER) {
 *     setStatus('already_member');
 *   } else {
 *     toast.error(message);
 *   }
 * }
 */
export const parseApiError = (error: unknown): ParsedApiError => {
  const response = readProp(error, 'response');
  const data = readProp(response, 'data');

  const rawCode = readProp(data, 'code');
  const code = isBackendErrorCode(rawCode) ? rawCode : null;

  const dataMessage = readProp(data, 'message');
  const errorMessage = readProp(error, 'message');
  const message =
    (typeof dataMessage === 'string' && dataMessage.length > 0 && dataMessage) ||
    (typeof errorMessage === 'string' && errorMessage.length > 0 && errorMessage) ||
    'Unknown error';

  const rawStatus = readProp(response, 'status');
  const status = typeof rawStatus === 'number' ? rawStatus : null;

  return { code, message, status };
};
