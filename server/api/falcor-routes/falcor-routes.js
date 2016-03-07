import Router from 'falcor-router'
import { Observable } from 'rx'
// import { ref as $ref, error as $error } from 'falcor-json-graph'
import { getNOrders } from '../fakeData/order'

class RouterBase extends Router.createClass([
  {
    route: 'myorders.lenght',
    get(pathSet) {
      return { path: ['myorders', 'lenght'], value: 1 }
    }
  },
  {
    route: 'myorders[{ranges:indexRanges}].city',
    get(pathSet) {
      return Observable.from(pathSet.indexRanges)
      .map((range) => {
        let myorders = getNOrders(range.to)
        return myorders.map((order, idx) => {
          return {
            path: ['myorders', idx, 'city'],
            value: order.pickupAddress.city
          }
        })
      })
    }
  }
]) {
  constructor(state) {
    super()
    this.state = state
  }
}

module.exports = RouterBase
