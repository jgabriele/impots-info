import App from './pages/App'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import TaxComputingExplanation from './pages/TaxComputingExplanation'
import TaxUseExplanation from './pages/TaxUseExplanation'
import About from './pages/About'

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        title: 'Accueil',
        exact: true,
        component: Home
      },
      {
        path: '/calculer-mon-impot-sur-le-revenu',
        title: 'Calculer mon impôt',
        exact: true,
        component: Calculator
      },
      {
        path: '/comprendre-l-impot',
        title: 'Comprendre l\'impôt sur le revenu',
        exact: true,
        component: TaxComputingExplanation
      },
      {
        path: '/a-quoi-sert-l-impot',
        title: 'À quoi sert l\'impôt sur le revenu?',
        exact: true,
        component: TaxUseExplanation
      },
      {
        path: '/a-propos',
        title: 'Qui suis-je ?',
        exact: true,
        component: About
      }
    ]
  }
]
