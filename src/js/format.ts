/** Unit formatting shared by the tools bundle (mirrors rcm_fmt() in helpers.php). */

const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

export function fmtUnit(v: number | null | undefined, unit: string): string {
  if (v === null || v === undefined || !Number.isFinite(v)) return 'Not available';
  switch (unit) {
    case 'usd':
      return Math.abs(v) >= 1000 ? usd0.format(v) : usd2.format(v);
    case 'pct':
      return `${num.format(v)}%`;
    case 'days':
      return `${num.format(v)} ${Math.abs(v) === 1 ? 'day' : 'days'}`;
    case 'hours':
      return `${num.format(v)} ${Math.abs(v) === 1 ? 'hour' : 'hours'}`;
    case 'months':
      return `${num.format(v)} ${Math.abs(v) === 1 ? 'month' : 'months'}`;
    case 'years':
      return `${num.format(v)} ${Math.abs(v) === 1 ? 'year' : 'years'}`;
    default:
      return num.format(v);
  }
}

export const UNIT_SUFFIX: Record<string, string> = { usd: '$', pct: '%', days: 'days', count: '', hours: 'hrs', months: 'mo', ratio: '', years: 'yrs' };
