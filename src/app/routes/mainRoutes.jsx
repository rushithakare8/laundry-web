'use strict'
/*global document*/

import React from 'react'
import { Route } from 'react-router'
import App from '../containers/app.jsx'
import MainContainer from '../containers/mainContainer.jsx'

export default (
  <Route path='/' component={ App } >
    <Route path='/main' component={ MainContainer } />
  </Route>
)
