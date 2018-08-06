import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import CalculatorInputs from './calculator-inputs'
import CalculatorResults from './calculator-results'

import { setSalary, setMarriedStatus, setNbChildren, computeTax } from '../../state/calculator'

import styles from './styles'


// Ce simulateur <strong>n'a pas</strong> été fait pour la classe aisée. Il ne prends pas en compte les limites maximum
// à certains avantage et il se peut que le résultat donné soit faux si vous gagnez plus de 10000€/mois.
// Enfin, avec ce revenu là j'imagine que votre comptable s'occupe déjà de calculer votre impôt ;)

const CalculatorPage = ({ classes }) => (
  <Fragment>
    <div className={classes.wrapper}>
      <div className={classes.inputs}><CalculatorInputs /></div>
      <div className={classes.results}><CalculatorResults /></div>
    </div>
  </Fragment>
)

export default injectSheet(styles)(CalculatorPage)
