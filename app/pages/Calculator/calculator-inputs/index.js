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

class CalculatorInputs extends React.PureComponent {
  handleSetPrimarySalary = (e) => {
    this.props.setSalary(Number(e.currentTarget.value), 'primary')
  }

  handleSetSecondarySalary = (e) => {
    this.props.setSalary(Number(e.currentTarget.value), 'secondary')
  }

  handleMarriedState = (e) => {
    this.props.setMarriedStatus(e.currentTarget.checked)
  }

  handleSetNbChildren = (e) => {
    this.props.setNbChildren(Number(e.currentTarget.value))
  }

  render () {
    const { classes, salary, isMarried, nbChildren, computeTax } = this.props
    return (
      <Paper elevation={3} component='aside' classes={{ root: classes.form }}>
        <FormGroup>
          <TextField
            type="number"
            label="Revenu annuel Net"
            value={salary.primary}
            onChange={this.handleSetPrimarySalary}
          />(i)

          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={isMarried}
                onChange={this.handleMarriedState}
              />
            }
            label="Je suis marié(e) ou PACSé(e)"
          />


          {
            isMarried &&
            <TextField
              type="number"
              label="Revenu annuel Net de votre partenaire"
              value={salary.secondary}
              onChange={this.handleSetSecondarySalary}
            />
          }

          <TextField
            type="number"
            label="Nombre d'enfants à charge"
            value={nbChildren}
            onChange={this.handleSetNbChildren}
          />
        </FormGroup>

        <Button onClick={computeTax}>Calculer</Button>
      </Paper>
    )
  }
}

const mapStateToProps = state => state.calculator
const mapDispatchToProps = {
  setSalary,
  setMarriedStatus,
  setNbChildren,
  computeTax
}

const ConnectedCalculatorInputs = connect(mapStateToProps, mapDispatchToProps)(CalculatorInputs)

export default injectSheet(styles)(ConnectedCalculatorInputs)
