import computeTaxAmount, { calculateChildrenParts } from './lib'

const SET_SALARY = 'calculator/set-salary'
const SET_MARRIED_STATUS = 'calculator/set-married-status'
const SET_NB_CHILDREN = 'calculator/set-nb-children'
const COMPUTE_TAX = 'calculator/compute-tax'

export const setSalary = (amount, personType) => {
  return {
    type: SET_SALARY,
    personType,
    amount
  }
}

export const setMarriedStatus = (isMarried) => {
  return {
    type: SET_MARRIED_STATUS,
    isMarried
  }
}

export const setNbChildren = (nbChildren) => {
  return {
    type: SET_NB_CHILDREN,
    nbChildren
  }
}

export const computeTax = () => {
  return {
    type: COMPUTE_TAX
  }
}

const initialState = {
  salary: {
    primary: 30000,
    secondary: 0
  },
  isMarried: false,
  parts: 1,
  nbChildren: 0,
  tax: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET_SALARY:
    return {
      ...state,
      tax: null,
      salary: {
        ...state.salary,
        [action.personType]: action.amount
      }
    }
  case SET_MARRIED_STATUS:
    return {
      ...state,
      tax: null,
      isMarried: action.isMarried
    }
  case SET_NB_CHILDREN:
    return {
      ...state,
      parts: state.parts - calculateChildrenParts(state.nbChildren) + calculateChildrenParts(action.nbChildren),
      tax: null,
      nbChildren: action.nbChildren
    }
  case COMPUTE_TAX:
    const tax = computeTaxAmount(state.salary.primary + state.salary.secondary, state.nbChildren, state.isMarried)
    return {
      ...state,
      ...tax,
      tax: tax.totalTax
    }
  default:
    return state
  }
}
