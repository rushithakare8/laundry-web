// import jQuery from 'jquery'
import * as apiValues from '../constants/mainApiValues.js'
let apiConfig = require('../../../configs/api.json')['dev']
let getDataUrl = function(apiConfig, path, parms) {
  return `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}${path}/${parms.id}`
}

export default {
  getData(parms, cb) {
    let url = getDataUrl(apiConfig, apiValues.GET_DATA_PATH, parms)
    jQuery.get(url, (data) => {
      cb(data)
    }).error((err) => {
      throw err
    })
  }
}
