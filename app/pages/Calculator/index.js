import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { setSalary, setMarriedStatus, setNbChildren, computeTax } from '../../state/calculator'

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

// i1 et i2 =>  C'est écrit sur la fiche de paie

class CalculatorPage extends React.PureComponent {
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
    const { isMarried, tax, parts, computeTax } = this.props
    return (
      <Fragment>
        <label for="netPay">Revenu annuel Net</label> (i1)
        <input type="number" id="netPay" onInput={this.handleSetPrimarySalary}  />

        <label for="married">Marié / PACSé</label>
        <input type="checkbox" id="married" onChange={this.handleMarriedState} />

        {
          isMarried &&
          <Fragment>
            <label id="partnerNetPayLabel" for="netPay">Revenu annuel Net de votre partenaire (i2)</label>
            <input type="number" id="partnerNetPay" onInput={this.handleSetSecondarySalary} />
          </Fragment>
        }

        <label for="nbChildren">Nombre d'enfants</label>
        <input type="number" id="nbChildren" min="0" max="12" onChange={this.handleSetNbChildren} />

        <button onClick={computeTax}>Calculer</button>

        {
          tax !== null ?
            <TaxAmount value={tax} parts={parts} /> :
            <div>Cliquez sur le bouton "calculer" pour connaître le montant de votre impôt</div>
        }
      </Fragment>
    )
  }
}

function TaxAmount ({ value, parts }) {
  return <div>
    Votre impôt sera de {value}€
    Nombre de parts: {parts}
  </div>
}

const mapStateToProps = state => state.calculator
const mapDispatchToProps = {
  setSalary,
  setMarriedStatus,
  setNbChildren,
  computeTax
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorPage)
