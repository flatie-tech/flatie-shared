/**
 * Dependency-free OKLCH → sRGB hex conversion (OKLab reference math,
 * gamut-clipped per channel). Ported from flatie-mobile's
 * `scripts/oklch-to-hex.js` so the shared build can emit hex token
 * artifacts for React Native consumers, whose color APIs don't parse
 * `oklch(...)` strings.
 */

function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  const clip = (x) => Math.max(0, Math.min(1, x));

  return [clip(gamma(rLin)), clip(gamma(gLin)), clip(gamma(bLin))];
}

const toHex2 = (n) => {
  const v = Math.round(n * 255);
  return v.toString(16).padStart(2, '0');
};

function formatColor(r, g, b, alpha) {
  if (alpha === undefined || alpha >= 0.999) return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}${toHex2(alpha)}`;
}

/**
 * Replace every `oklch(L C H)` / `oklch(L C H / A)` / `oklch(L C H / A%)`
 * occurrence in `input` with its `#rrggbb` / `#rrggbbaa` equivalent.
 */
export function replaceOklch(input) {
  const re = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.-]+)\s*(?:\/\s*([\d.]+)(%?))?\s*\)/g;
  return input.replace(re, (_, L, C, H, A, pct) => {
    const [r, g, b] = oklchToRgb(Number.parseFloat(L), Number.parseFloat(C), Number.parseFloat(H));
    const alpha = A === undefined ? undefined : Number.parseFloat(A) / (pct === '%' ? 100 : 1);
    return formatColor(r, g, b, alpha);
  });
}

/**
 * Convert a single CSS color value. Non-oklch values pass through unchanged
 * (hex, named colors, etc. are already native-safe).
 */
export function oklchToHex(value) {
  return replaceOklch(value);
}
