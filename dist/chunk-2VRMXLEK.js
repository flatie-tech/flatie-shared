// src/utils/money.ts
function toCents(money) {
  const s = typeof money === "number" ? money.toString() : money.trim();
  if (!/^-?\d+(\.\d{1,2})?$/.test(s)) {
    throw new Error(`Invalid money value: ${JSON.stringify(money)}`);
  }
  const negative = s.startsWith("-");
  const [whole, frac = ""] = s.replace("-", "").split(".");
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return negative ? -cents : cents;
}
function fromCents(cents) {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(Math.trunc(cents));
  return `${sign}${Math.floor(abs / 100)}.${(abs % 100).toString().padStart(2, "0")}`;
}
function normalizeMoney(money) {
  return fromCents(toCents(money));
}
function sumMoney(values) {
  return fromCents(values.reduce((acc, v) => acc + toCents(v), 0));
}
function addMoney(a, b) {
  return fromCents(toCents(a) + toCents(b));
}
function subtractMoney(a, b) {
  return fromCents(toCents(a) - toCents(b));
}
function moneyEquals(a, b) {
  return toCents(a) === toCents(b);
}
function formatMoney(money, format, currency = "EUR") {
  if (money === null || money === void 0 || money === "") return "-";
  return format(toCents(money) / 100, currency === "\u20AC" ? "EUR" : currency);
}

export { addMoney, formatMoney, fromCents, moneyEquals, normalizeMoney, subtractMoney, sumMoney, toCents };
//# sourceMappingURL=chunk-2VRMXLEK.js.map
//# sourceMappingURL=chunk-2VRMXLEK.js.map