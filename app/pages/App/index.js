import React from 'react'
import injectSheet from 'react-jss'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../../routes'

import styles, { activeStyle } from './styles'

const App = ({ classes, route, location }) => {
  if (location.pathname === '/') {
    return renderRoutes(route.routes)
  }

  return (
    <div>
      <nav className={classes.navigation}>
        {
          routes[0].routes
            .map(r => (
              <NavLink
                key={r.path}
                className={classes.link}
                to={r.path}
                exact
                activeStyle={activeStyle}
              >
                {r.title}
              </NavLink>
            ))
        }
      </nav>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default injectSheet(styles)(App)
