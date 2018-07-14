import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ThemeProvider } from 'react-jss'

import routes from '../routes'
import reducers from '../state/reducers'
import theme from '../theme'

const store = createStore(
  reducers, applyMiddleware(thunk)
)

function getData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

export default function router(req, res) {
  return getData()
    .then(resp => {
      const html = renderToString(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <StaticRouter context={{}} location={req.url} >
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        </ThemeProvider>
      )

      res.status(200).send(renderFullPage(html, { toto: true }))
    })
    .catch(err => res.status(404).send(`${err}`))
};

function renderFullPage(html, preloadedState) {
  return `
        <!doctype html>
        <html>
        <head>
            <title>Mes impots</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `
}
