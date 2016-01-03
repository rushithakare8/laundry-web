'use strict'
let Glue = require('glue')
let Manifest = require('./manifest')
let composeOptions = {
  relativeTo: __dirname,
}
let composer =  Glue.compose.bind(Glue, Manifest.get('/'), composeOptions)

composer(function(err, server) {
  if (err) {
    throw err
  }
  server.start(function() {
    console.log('Started the plot device on port ' + server.info.port)
  })
})
