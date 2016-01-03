import apiStore from '../api/mainApi.js'
import * as mainActions from '../constants/mainActionTypes.js'

// Do some pre prosessiong to the data here:
function processTrends(data) {
  return {
    type: mainActions.GET_DATA,
    result: {
      data: data
    }
  }
}

export function getData(parms) {
  return (dispatch, getState) => {
    apiStore.getTrendsByMetroIndustry(parms, data => {
      dispatch(processTrends(data))
    })
  }
}
