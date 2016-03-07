import Boom from 'boom'
import Joi from 'joi'

const parseArgs = {
  'jsonGraph': true,
  'callPath': true,
  'arguments': true,
  'pathSuffixes': true,
  'paths': true
}

function requestToContext(req) {
  const queryMap = req.method === "post" ? req.payload : req.query
  let context = {}
  if (queryMap) {
    Object.keys(queryMap).forEach((key) => {
      let arg = queryMap[key]
      if (parseArgs[key] && arg != null) {
        context[key] = JSON.parse(arg)
      } else {
        context[key] = arg
      }
    })
  }
  return context
}


module.exports = {
  dataSourceRoute(getDataSource) {
    return (req, reply) => {
      let obs
      let context = requestToContext(req)
      let dataSource = getDataSource(req, reply)
      // probably this should be sanity check function?
      if (Object.keys(context).length === 0) {
        return reply(Boom.badRequest("Request not supported"))
      }
      if (typeof context.method === "undefined" || context.method.length === 0) {
        return reply(Boom.badRequest("No query method provided"))
      }
      if (typeof dataSource[context.method] === "undefined") {
        return reply(Boom.badRequest("Data source does not implement the requested method"))
      }
      if (context.method === "set") {
        obs = dataSource[context.method](context.jsonGraph)
      } else if (context.method === "call") {
        obs = dataSource[context.method](context.callPath, context.arguments, context.pathSuffixes, context.paths)
      } else {
        obs = dataSource[context.method]([].concat(context.paths))
      }
      obs.subscribe((jsonGraphEnvelope) => {
        reply(jsonGraphEnvelope)
      }, (err) => {
        reply(err)
      })
    }
  }
}
