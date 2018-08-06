import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'

import { setSalary, setMarriedStatus, setNbChildren, computeTax } from '../../../state/calculator'
import TaxSlices from '../../../components/tax-slices'

import styles from './styles'

// <!-- Idea: "Si vous avez une augment' de X€ NET, vous devrez Y€ au fisc" -->
// <!-- Idea: Chiffres clés: En 2018, vous êtes imposable si vous gagnez plus de X€ NET annuel -->
// <!-- Idea: Input "Votre salaire mensuel" (i) cette méthode est forcément moins précise que si vous connaissez votre salaire net annuel -->
// <!-- Idea: Show "Taux marginal d'imposition" (i) Mot barbare pour indiquer la tranche la plus haute -->
// <!-- Idea: Astuces: tickets resto pas imposables si employeur contribue 50-60% et - de 5.33€ -->
//
// <!-- TODO UI Votre email ne sera pas vendu -->
//
// <!-- Emails: On va se marier: est-il préférable de se déclarer ensemble ou séparément ? -->
// <!-- Emails: Les frais réels: Pour qui c'est utile ? -->
// <!-- Emails: Défiscalisation: c'est légal ? -->

// i =>  C'est écrit sur la fiche de paie

class CalculatorResults extends React.PureComponent {
  render () {
    const { classes, tax, initialTax, decote, lowSalaryReduction, lowSalaryReductionPercentage, taxesPerSlice, parts, isMarried } = this.props

    if (tax === null) {
      return <div>Cliquez sur le bouton "calculer" pour connaître le montant de votre impôt</div>
    }

    // hint: une demi-part liée à un enfant ne peut retirer que jusqu'a 1527E sur votre impot

    return (
      <div>
        Votre impôt sera de {tax}€ (il aurait dû être d'environ {initialTax}€)
        <br />
        Decote: {decote}
        <br />
        réduction sous condition de revenu: {lowSalaryReduction} ({lowSalaryReductionPercentage * 100}%)
        <br />
        <TaxSlices slices={taxesPerSlice} />
        <br />
        Nombre de parts: {parts + (isMarried ? 1 : 0)}
      </div>
    )
  }
}

function TaxAmount ({ value, decote, lowSalaryReduction, lowSalaryReductionPercentage, taxesPerSlice, parts }) {
  return <div>
    Votre impôt sera de {value}€.
    Decote: {decote}
    réduction sous condition de revenu: {lowSalaryReduction} ({lowSalaryReductionPercentage}%)
    {taxesPerSlice}
    Nombre de parts: {parts}
  </div>
}

const mapStateToProps = state => state.calculator

const ConnectedCalculatorResults = connect(mapStateToProps)(CalculatorResults)

export default injectSheet(styles)(ConnectedCalculatorResults)
