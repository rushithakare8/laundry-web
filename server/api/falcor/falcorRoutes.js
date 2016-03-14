import Router from 'falcor-router';
import { Observable } from 'rx';
// import { ref as $ref, error as $error } from 'falcor-json-graph';
import { getNOrders } from '../fakeData/order';

class RouterBase extends Router.createClass([
  {
    route: 'myorders.lenght',
    get() {
      return { path: ['myorders', 'lenght'], value: 1 };
    },
  },
  {
    route: 'myorders[{ranges:indexRanges}][{keys:props}]',
    get(pathSet) {
      return Observable.from(pathSet.indexRanges)
      .flatMap(range => Observable.fromPromise(getNOrders(range.to))
      .flatMap(orders => Observable.from(pathSet.props)
      .flatMap(prop => {
        console.log('#########################', prop);
        console.log('#########################', range);

        const pathValues = orders.
        map((order, idx) => ({
          path: ['myorders', idx, prop],
          value: order[prop],
        }));
        return pathValues;
      })));
    },
  },
]) {
  constructor(state) {
    super();
    this.state = state;
  }
}

module.exports = RouterBase;
