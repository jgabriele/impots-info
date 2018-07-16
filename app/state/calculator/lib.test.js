import { default as computeTax, calculateChildrenParts, computeDecote, getLowSalaryReduction } from './lib'

function createComputeTaxExpector(nbChildren, married) {
  return (amount, expected) => {
    expect(computeTax(amount, nbChildren, married).totalTax).toBe(expected)
  }
}

describe('Tax computing algorithm', () => {
  test('should compute correct children parts', () => {
    expect(calculateChildrenParts(0)).toBe(0)
    expect(calculateChildrenParts(1)).toBe(0.5)
    expect(calculateChildrenParts(2)).toBe(1)
    expect(calculateChildrenParts(3)).toBe(2)
    expect(calculateChildrenParts(6)).toBe(5)
  })

  describe('should compute correct decote', () => {
    test('for a single person', () => {
      expect(computeDecote(0, false)).toBe(1176.75)
      expect(computeDecote(1400, false)).toBe(126.75)
      expect(computeDecote(1569, false)).toBe(0)
    })
    test('for a married couple', () => {
      expect(computeDecote(0, true)).toBe(1938.75)
      expect(computeDecote(1569, true)).toBe(762)
      expect(computeDecote(2585, true)).toBe(0)
    })
  })
  describe('should compute correct low salary reduction', () => {
    test('for a single person', () => {
      expect(getLowSalaryReduction(0, false)).toBe(0.2)
      expect(getLowSalaryReduction(18685, false)).toBe(0.2)
      expect(getLowSalaryReduction(19500, false)).toBe(0.1205)
      expect(getLowSalaryReduction(20705, false)).toBe(0)
      expect(getLowSalaryReduction(22000, false)).toBe(0)
    })
    test('for a married couple', () => {
      expect(getLowSalaryReduction(0, true)).toBe(0.2)
      expect(getLowSalaryReduction(37370, true)).toBe(0.2)
      expect(getLowSalaryReduction(39000, true)).toBe(0.1205)
      expect(getLowSalaryReduction(41410, true)).toBe(0)
      expect(getLowSalaryReduction(44000, true)).toBe(0)
    })
    test('for a married cpi[;e] with 1 child', () => {
      expect(getLowSalaryReduction(3737, true, 0.5)).toBe(0.2)
      expect(getLowSalaryReduction(41107, true, 0.5)).toBe(0.2)
      expect(getLowSalaryReduction(42737, true, 0.5)).toBe(0.1205)
      expect(getLowSalaryReduction(45147, true, 0.5)).toBe(0)
      expect(getLowSalaryReduction(48000, true, 0.5)).toBe(0)
    })
  })

  describe('should compute right tax amount', () => {
    test('for a single person', () => {
      const expectFor = createComputeTaxExpector(0, false)
      expectFor(24000, 1651)
      expectFor(36000, 4013)
      expectFor(58874, 10189)
    })
    test('for a married couple', () => {
      const expectFor = createComputeTaxExpector(0, true)
      expectFor(24000, 0)
      expectFor(36000, 955)
      expectFor(58874, 4672)
    })
    test('for a single person with 3 children', () => {
      const expectFor = createComputeTaxExpector(3, false)
      expectFor(36000, 0)
      expectFor(58874, 4081)
      expectFor(65000, 5735)
    })
    test('for a married couple with 3 children', () => {
      const expectFor = createComputeTaxExpector(3, true)
      expectFor(42000, 0)
      expectFor(58874, 1191)
      expectFor(72000, 3580)
    })
  })
})
