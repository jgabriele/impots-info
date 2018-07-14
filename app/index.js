import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import routes from './routes'
import reducers from './state/reducers'

const store = createStore(
  reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
)

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')
)