interface CalculateSimpleReturnInput {
  wages: number;
  federalTaxWithheld: number;
}

interface CalculateSimpleReturnOutput {
  taxableIncome: number;
  totalTax: number;
  refundOrAmountOwed: number;
}

const STANDARD_DEDUCTION_SINGLE_2023 = 13850;

// 2023 Federal Tax Brackets for Single Filing Status
// Each bracket represents: income above this threshold is taxed at this rate
// The brackets are: 10% up to $11,000, 12% from $11,001-$44,725, etc.
const TAX_BRACKETS_2023_SINGLE = [
  { threshold: 0, rate: 0.10 },        // 10% on $0 to $11,000
  { threshold: 11000, rate: 0.12 },    // 12% on $11,001 to $44,725
  { threshold: 44725, rate: 0.22 },    // 22% on $44,726 to $95,375
  { threshold: 95375, rate: 0.24 },    // 24% on $95,376 to $182,050
  { threshold: 182050, rate: 0.32 },   // 32% on $182,051 to $231,250
  { threshold: 231250, rate: 0.35 },   // 35% on $231,251 to $578,125
  { threshold: 578125, rate: 0.37 },   // 37% on $578,126 and above
];

export function calculateSimpleReturn({
  wages,
  federalTaxWithheld,
}: CalculateSimpleReturnInput): CalculateSimpleReturnOutput {
  // Calculate taxable income (wages - standard deduction, minimum 0)
  const taxableIncome = Math.max(0, wages - STANDARD_DEDUCTION_SINGLE_2023);

  // Calculate total tax using progressive tax brackets
  let totalTax = 0;

  for (let i = 0; i < TAX_BRACKETS_2023_SINGLE.length; i++) {
    const currentBracket = TAX_BRACKETS_2023_SINGLE[i];
    const nextBracket = TAX_BRACKETS_2023_SINGLE[i + 1];

    if (taxableIncome <= currentBracket.threshold) {
      break;
    }

    const bracketTop = nextBracket ? nextBracket.threshold : Infinity;
    const incomeInThisBracket = Math.min(taxableIncome, bracketTop) - currentBracket.threshold;

    if (incomeInThisBracket > 0) {
      totalTax += incomeInThisBracket * currentBracket.rate;
    }
  }

  // Calculate refund or amount owed
  const refundOrAmountOwed = federalTaxWithheld - totalTax;

  return {
    taxableIncome,
    totalTax,
    refundOrAmountOwed,
  };
}

