import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import CalculatorInputs from './calculator-inputs'
import CalculatorResults from './calculator-results'

import { setSalary, setMarriedStatus, setNbChildren, computeTax } from '../../state/calculator'

import styles from './styles'

const CalculatorPage = ({ classes }) => (
  <div className={classes.wrapper}>
    <div className={classes.inputs}><CalculatorInputs /></div>
    <div className={classes.results}><CalculatorResults /></div>
  </div>
)

export default injectSheet(styles)(CalculatorPage)
