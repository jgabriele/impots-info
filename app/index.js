import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ThemeProvider } from 'react-jss'

import routes from './routes'
import reducers from './state/reducers'
import theme from './theme'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers, window.__INITIAL_STATE__, composeEnhancers(applyMiddleware(thunk))
)

render(
  (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  ),
  document.getElementById('app')
)
