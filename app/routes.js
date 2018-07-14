import App from './pages/App'
import Home from './pages/Home'
import Source from './pages/Source'

export default [
  {
    component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/source',
        component: Source
      }
    ]
  }
]
