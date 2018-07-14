import App from './pages/App'
import Calculator from './pages/Calculator'
import TaxComputingExplanation from './pages/TaxComputingExplanation'
import TaxUseExplanation from './pages/TaxUseExplanation'

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        title: 'Calculer mon impôt',
        exact: true,
        component: Calculator
      },
      {
        path: '/comment-est-calcule-l-impot',
        title: 'Comment est calculé l\'impôt?',
        component: TaxComputingExplanation
      },
      {
        path: '/a-quoi-sert-l-impot',
        title: 'À quoi sert l\'impôt?',
        component: TaxUseExplanation
      }
    ]
  }
]
