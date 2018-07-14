import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../../routes'

export default ({ route }) =>
  (
    <div>
      <nav>
        <ul>
          {
            routes[0].routes
              .map(r => (
                <li key={r.path}>
                  <Link to={r.path}>{r.title}</Link>
                </li>
              ))
          }
        </ul>
      </nav>
      {renderRoutes(route.routes)}
    </div>
  )
