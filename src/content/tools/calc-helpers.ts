/** Small helpers shared by calculator compute functions. All return null instead of NaN/Infinity. */

export const num = (v: number | undefined) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

/** a / b, or null when b is zero or either side is not finite. */
export function div(a: number, b: number): number | null {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return null;
  return a / b;
}

/** a / b * 100, or null. */
export function pct(a: number, b: number): number | null {
  const r = div(a, b);
  return r === null ? null : r * 100;
}

export const sum = (...xs: number[]) => xs.reduce((n, x) => n + num(x), 0);

/** Round to 2 decimals (for tests and display parity). */
export const r2 = (v: number) => Math.round(v * 100) / 100;
