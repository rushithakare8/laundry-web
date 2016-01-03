'use strict'

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/root.jsx'
import configureStore from './stores/mainConfigStore.js'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('container')
)
