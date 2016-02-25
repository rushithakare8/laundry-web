'use strict'

import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import createLocation from 'history/lib/createLocation'

import makeRoutes from '../../../src/app/routes'
import configureStore from '../../../src/app/redux/configureStore'

const RenderApp = (url, initialState) => {
  return new Promise((resolve, reject) => {
    try {
      const location = createLocation(url)
      const store = configureStore(initialState)
      const routes = makeRoutes(store)
      match({ routes, location }, (err, redirectLocation, renderProps) => {
        let html ='';
        if (err) {
          reject(err)
        }
        if (!renderProps) {
          reject(['Route not Found'])
        }
        html = renderToString(
          <Provider store={ store }>
            <RouterContext {...renderProps} />
          </Provider>
        )
        resolve(html)
      })
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = RenderApp
