// Slices of taxes in 2018
const TAXES = [
  { from: 0, to: 9807, percentage: 0, maxTax: 0 },
  { from: 9808, to: 27086, percentage: 0.14, maxTax: 2418.92 },
  { from: 27087, to: 72617, percentage: 0.30, maxTax: 13659 },
  { from: 72618, to: 153783, percentage: 0.41, maxTax: 33277.65 },
  { from: 153784, to: Infinity, percentage: 0.45, maxTax: Infinity }
]

// Tax threshold for extra reduction (decote)
const MIN_TAX_REDUCTIONS_SINGLE = 1569
const MIN_TAX_REDUCTIONS_MARRIED = 2585

// Salary threshold for low incomes reduction
const MIN_SALARY_LOW_INCOME_SINGLE = 18685
const MAX_SALARY_LOW_INCOME_SINGLE = 20705
const MIN_SALARY_LOW_INCOME_MARRIED = 37370
const MAX_SALARY_LOW_INCOME_MARRIED = 41410
const EXTRA_SALARY_PER_HALF_PART =  3737

// Min / Max values of the 10% abatement to net salary
const ABATEMENT_COSTS = {
  default: { min: 430, max: 12305 },
  retired: { min: 383, max: 3752 }
}

// Max amount that can be deduced for an additional 0.5 part
const MAX_TAX_REDUCTION_PER_HALF_PART = 1527

function round(number, precision = 0) {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
}

// 2 first children bring 0.5 part, the rest 1 part
export function calculateChildrenParts(nbChildren) {
  if (nbChildren === 0) return 0
  if (nbChildren === 1) return 0.5
  return nbChildren - 1
}

export function getSlices(tax) {
  return TAXES
    .reduce(
      ({ remainingAmount, taxSlices }, slice) => {
        if (remainingAmount === 0) {
          return { taxSlices, remainingAmount }
        }

        const value = Math.min(remainingAmount, slice.maxTax)
        return {
          remainingAmount: Math.max(0, remainingAmount - slice.maxTax),
          taxSlices: taxSlices.concat([
            {
              ...slice,
              value,
              taxPercentage: Math.round(value / slice.maxTax * 100) || 100
            }
          ])
        }
      }, { taxSlices: [], remainingAmount: tax }
    )
    .taxSlices
}

function _getTaxes(taxableAmount, totalParts) {
  const taxableAmountByPart = taxableAmount / totalParts

  return TAXES
    .reduce(
      ({ remainingAmount, taxesPerSlice, totalTaxByPart }, { from, to, percentage }) => {
        if (remainingAmount === 0) {
          return { remainingAmount, taxesPerSlice, totalTaxByPart }
        }

        const sliceAmount = to - from
        const currentSliceAmount = Math.min(remainingAmount, sliceAmount)
        const currentSliceTax = round(percentage * currentSliceAmount, 3)
        const nextSliceAmount = Math.max(remainingAmount - sliceAmount, 0)

        return {
          remainingAmount: nextSliceAmount,
          taxesPerSlice: taxesPerSlice.concat([currentSliceTax * totalParts]),
          totalTaxByPart: totalTaxByPart + currentSliceTax
        }
      },
      { remainingAmount: taxableAmountByPart, taxesPerSlice: [], totalTaxByPart: 0 }
    )
    .totalTaxByPart
}

function getTaxes(taxableAmount, mainParts, childrenParts) {
  const parts = mainParts + childrenParts
  const taxWithoutChildren = _getTaxes(taxableAmount, mainParts) * mainParts
  const taxWithChildren = _getTaxes(taxableAmount, parts) * parts
  const taxWithChildrenLimited = taxWithoutChildren - (MAX_TAX_REDUCTION_PER_HALF_PART * 2 * childrenParts)

  // Tax reduction offered by children cannot excede MAX_TAX_REDUCTION_PER_HALF_PART
  if (taxWithChildrenLimited > taxWithChildren) {
    return taxWithChildrenLimited
  }

  return taxWithChildren
}

// Computing of the low salary reduction. Is applied after "decote"

export function getLowSalaryReduction(taxableAmount, isMarried, extraPart = 0) {
  const extraSalary = extraPart * 2 * EXTRA_SALARY_PER_HALF_PART
  const minSalaryReference = (isMarried ? MIN_SALARY_LOW_INCOME_MARRIED : MIN_SALARY_LOW_INCOME_SINGLE) + extraSalary
  if (taxableAmount <= minSalaryReference) {
    return 0.2
  }

  const maxSalaryReference = (isMarried ? MAX_SALARY_LOW_INCOME_MARRIED : MAX_SALARY_LOW_INCOME_SINGLE) + extraSalary
  if (taxableAmount < maxSalaryReference) {
    return round(20 * (maxSalaryReference - taxableAmount) / (isMarried ? 4000 : 2000) / 100, 4)
  }

  return 0
}

// Computing of the "decote"
export function computeDecote(totalTaxSoFar, isMarried) {
  const minTaxThreshold = isMarried ? MIN_TAX_REDUCTIONS_MARRIED : MIN_TAX_REDUCTIONS_SINGLE
  return (totalTaxSoFar < minTaxThreshold) ?
    round(0.75 * (minTaxThreshold - totalTaxSoFar), 3) :
    0
}

export default function computeTax(netPay, nbChildren = 0, isMarried) {
  const childrenParts = calculateChildrenParts(nbChildren)
  const mainParts = isMarried ? 2 : 1
  const parts = mainParts + childrenParts
  const taxableAmount = netPay * 0.9

  // Compute tax slices
  let totalTax = getTaxes(taxableAmount, mainParts, childrenParts)

  const taxesPerSlice = getSlices(totalTax)

  const initialTax = round(totalTax) // Tax without any reduction

  // Decote
  const decote = computeDecote(totalTax, isMarried)

  totalTax = Math.max(0, totalTax - decote)

  // Low salary reduction
  const lowSalaryReductionPercentage = (totalTax > 0) ?
    getLowSalaryReduction(taxableAmount, isMarried, childrenParts) :
    0
  const lowSalaryReduction = totalTax * lowSalaryReductionPercentage

  totalTax = round(totalTax * (1 - lowSalaryReductionPercentage))

  return {
    totalTax,
    initialTax,
    decote: round(decote), // in €
    lowSalaryReduction: round(lowSalaryReduction), // in €
    lowSalaryReductionPercentage: round(lowSalaryReductionPercentage, 1), // in %
    taxesPerSlice
  }
}
