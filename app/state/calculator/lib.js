const TAXES = [
  { from: 0, to: 9807, percentage: 0 },
  { from: 9808, to: 27086, percentage: 0.14 },
  { from: 27087, to: 72617, percentage: 0.30 },
  { from: 72618, to: 153783, percentage: 0.41 },
  { from: 153784, to: Infinity, percentage: 0.45 }
]
const MIN_TAX_REDUCTIONS_SINGLE = 1569
const MIN_TAX_REDUCTIONS_MARRIED = 2585
const PARTS_FOR_CHILDREN = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function calculateChildrenParts(nbChildren) {
  return PARTS_FOR_CHILDREN[nbChildren]
}

export default function calc(netPay, parts = 1, isMarried) {
  const taxableAmount = netPay * 0.9 / parts

  const { taxesPerSlice, totalTax } = TAXES.reduce(({ remainingAmount, taxesPerSlice, totalTax }, { from, to, percentage }) => {
    if (remainingAmount === 0) {
      return { remainingAmount, taxesPerSlice, totalTax }
    }

    const sliceAmount = to - from
    const currentSliceAmount = Math.min(remainingAmount, sliceAmount)
    const currentSliceTax = Math.round(percentage * currentSliceAmount)
    const nextSliceAmount = Math.max(remainingAmount - sliceAmount, 0)

    return {
      remainingAmount: nextSliceAmount,
      taxesPerSlice: taxesPerSlice.concat([currentSliceTax]),
      totalTax: totalTax + currentSliceTax
    }
  }, { remainingAmount: taxableAmount, taxesPerSlice: [], totalTax: 0 })

  const minTaxThreshold = isMarried ? MIN_TAX_REDUCTIONS_MARRIED : MIN_TAX_REDUCTIONS_SINGLE
  if (totalTax < minTaxThreshold) {
    // TODO UI (i) Vous bénéficiez de la décote
    return {
      totalTax: Math.max(0, totalTax - (0.75 * (minTaxThreshold - totalTax)) * parts),
      taxesPerSlice
    }
  }

  return {
    totalTax: totalTax * parts,
    taxesPerSlice
  }
}
