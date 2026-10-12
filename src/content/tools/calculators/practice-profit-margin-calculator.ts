import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'practice-profit-margin-calculator',
  name: 'Practice Profit Margin Calculator',
  category: 'revenue',
  icon: 'PiggyBank',
  summary: 'Estimate net profit, profit margin and overhead ratio from your collections and operating costs.',
  definition:
    'Practice profit margin is the share of collections left after paying the costs of running the practice. This calculator subtracts operating expenses and, optionally, provider compensation from collections to estimate net profit, profit margin and the overhead ratio, so you can see how much of each dollar collected goes to running costs.',
  inputs: [
    { id: 'collections', label: 'Total collections', unit: 'usd', default: 1000000, min: 0, step: 1000, help: 'Payer and patient payments actually received for the period (not charges), net of refunds.' },
    { id: 'operatingExpenses', label: 'Operating expenses (excluding provider pay)', unit: 'usd', default: 600000, min: 0, step: 1000, help: 'Staff wages and benefits, rent, supplies, billing, software, insurance and other running costs for the same period. Leave out physician and other provider compensation.' },
    { id: 'providerComp', label: 'Provider compensation', unit: 'usd', default: 0, min: 0, step: 1000, optional: true, help: 'Salaries, bonuses and benefits paid to physicians and other billing providers. Leave blank to see profit before provider pay, which is common for owner-run practices.' },
  ],
  outputs: [
    { id: 'netProfit', label: 'Net profit', unit: 'usd', primary: true, help: 'Collections minus operating expenses and provider compensation.' },
    { id: 'profitMargin', label: 'Profit margin', unit: 'pct', primary: true, help: 'Net profit as a share of collections.' },
    { id: 'overheadRatio', label: 'Overhead ratio', unit: 'pct', help: 'Operating expenses (excluding provider pay) as a share of collections.' },
    { id: 'incomeBeforeProviderComp', label: 'Income available for provider compensation', unit: 'usd', help: 'Collections minus operating expenses.' },
    { id: 'totalExpenses', label: 'Total expenses', unit: 'usd' },
  ],
  compute: (v) => {
    const collections = num(v.collections);
    const opex = num(v.operatingExpenses);
    const providerComp = num(v.providerComp);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (collections < 0 || opex < 0 || providerComp < 0) warnings.push('Amounts should not be negative. Check the figures.');
    if (collections <= 0) {
      warnings.push('Enter collections greater than zero to calculate margins.');
      return { values: { netProfit: null, profitMargin: null, overheadRatio: null, incomeBeforeProviderComp: null, totalExpenses: opex + providerComp }, warnings };
    }
    const totalExpenses = opex + providerComp;
    const netProfit = collections - totalExpenses;
    const incomeBeforeProviderComp = collections - opex;
    const profitMargin = pct(netProfit, collections);
    const overheadRatio = pct(opex, collections);
    if (opex > collections) warnings.push('Operating expenses are larger than collections, so the practice is losing money before any provider is paid.');
    if (providerComp === 0) {
      notes.push('No provider compensation was entered, so this margin is before provider pay. In an owner-run practice, this is roughly the pool available to pay the owners.');
    }
    if (netProfit < 0) {
      notes.push(`Expenses exceed collections by ${usd(-netProfit)} for this period. Reducing overhead or improving collections would both be needed to close the gap.`);
    } else if (profitMargin !== null) {
      notes.push(`About ${Math.round(profitMargin)} cents of each dollar collected remains after the expenses entered. This is an estimate based only on the figures you entered.`);
    }
    if (overheadRatio !== null) {
      notes.push(`Running costs use about ${Math.round(overheadRatio)}% of collections. Compare this with your own prior periods or a published survey for your specialty and practice size.`);
    }
    return {
      values: { netProfit, profitMargin, overheadRatio, incomeBeforeProviderComp, totalExpenses },
      notes: notes.slice(0, 3),
      warnings,
    };
  },
  formula: [
    { expression: 'Total expenses = Operating expenses + Provider compensation', explanation: 'Provider compensation is optional. Leave it at zero to see profit before provider pay.' },
    { expression: 'Net profit = Collections - Total expenses', explanation: 'Uses money actually collected, not charges, because charges include amounts the practice never receives.' },
    { expression: 'Profit margin = Net profit / Collections x 100', explanation: 'The share of each collected dollar left after expenses.' },
    { expression: 'Overhead ratio = Operating expenses / Collections x 100', explanation: 'Running costs as a share of collections, excluding provider compensation.' },
    { expression: 'Income available for provider compensation = Collections - Operating expenses', explanation: 'What remains to pay providers and owners before any profit is retained.' },
  ],
  example: {
    inputs: { collections: 1000000, operatingExpenses: 600000, providerComp: 250000 },
    expected: { netProfit: 150000, profitMargin: 15, overheadRatio: 60, incomeBeforeProviderComp: 400000, totalExpenses: 850000 },
    narrative:
      'A practice collected $1,000,000 in a year, spent $600,000 on operating costs and paid providers $250,000. Total expenses are 600,000 + 250,000 = $850,000, so net profit is 1,000,000 - 850,000 = $150,000 and the margin is 150,000 / 1,000,000 = 15%. The overhead ratio is 600,000 / 1,000,000 = 60%, and $400,000 was available to pay providers before profit.',
  },
  assumptions: [
    'Collections, operating expenses and provider compensation cover the same period.',
    'Figures are on a cash basis: money received and money spent, not charges or accrued amounts.',
    'Overhead excludes provider compensation. Some surveys define overhead differently, so check the definition before comparing.',
    'Taxes, debt principal payments and owner distributions are not modeled.',
  ],
  faqs: [
    {
      q: 'What is a medical practice profit margin?',
      a: 'A medical practice profit margin is the percentage of collections left after paying all expenses for the same period. It is calculated as net profit divided by collections. Because many physician owners take their income as compensation rather than profit, the margin depends heavily on whether provider pay is counted as an expense, so always state which version you are using.',
    },
    {
      q: 'Should provider compensation be included in expenses?',
      a: 'Include provider compensation when you want to see what the practice earns after everyone is paid, for example in a group or hospital-owned practice. Leave it out when you want to see the pool available to pay owner physicians. This calculator shows both: income available for provider compensation and net profit after the compensation you enter.',
    },
    {
      q: 'What is the overhead ratio?',
      a: 'The overhead ratio is operating expenses, excluding provider compensation, divided by collections. It shows how much of each collected dollar is spent on staff, rent, supplies, billing and other running costs. A rising overhead ratio means costs are growing faster than collections, which can squeeze provider income even when patient volume is steady.',
    },
    {
      q: 'Why use collections instead of charges?',
      a: 'Collections reflect money the practice actually received, while charges are list prices that payers rarely pay in full. Contractual adjustments, denials and unpaid patient balances all sit between charges and collections. Using charges would overstate revenue and make the margin look better than the cash position really is.',
    },
    {
      q: 'How can a practice improve its profit margin?',
      a: 'A practice can improve its margin by collecting more of what it is owed or by lowering running costs. On the revenue side, that usually means fewer denials, faster follow-up on unpaid claims and accurate coding. On the cost side, it means reviewing staffing, supplies, space and vendor contracts against the work they support.',
    },
  ],
  relatedServices: ['revenue-cycle-management', 'rcm-analytics-reporting', 'revenue-cycle-audit', 'practice-management-support'],
  relatedTools: ['break-even-calculator', 'revenue-per-provider-calculator', 'net-collection-rate-calculator', 'medical-billing-cost-calculator'],
  seoTitle: 'Medical Practice Profit Margin Calculator',
  metaDescription: 'Estimate your medical practice net profit, profit margin and overhead ratio from collections, operating expenses and provider pay, with a worked example.',
  keywords: ['medical practice profit margin calculator', 'practice overhead ratio', 'medical practice net profit', 'physician practice profitability'],
};

export default calc;
