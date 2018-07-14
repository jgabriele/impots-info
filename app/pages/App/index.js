import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Home from '../../pages/Home'
import Source from '../../pages/Source'


export default ({route}) =>
  (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/source">Source</Link>
          </li>
        </ul>
      </nav>
      {renderRoutes(route.routes)}
    </div>
  )
