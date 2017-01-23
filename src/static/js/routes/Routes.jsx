import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getRoutes,
} from './data/actions/routes';
import {
  selectRoute,
} from './data/actions/map';
import RoutesTable from './components/RoutesTable';
import MapDetails from './containers/MapDetails';
import Map from './containers/Map';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedRoute: null };
  }
  componentDidMount() {
    this.props.getRoutes();
    this.selectRoute = this.selectRoute.bind(this);
  }
  selectRoute(route) {
    this.setState({ selectedRoute: route });
    this.props.selectRoute(route);
  }
  render() {
    const { selectedRoute } = this.state;
    const { routes } = this.props;
    return (
      <div className="row">
        <RoutesTable routes={routes} selectRoute={this.selectRoute} />
        <div className="small-12 columns My(14px)">
          <Map />
          <MapDetails selectedRoute={selectedRoute} />
        </div>
      </div>
    );
  }
}

Routes.defaultProps = {
  routes: [],
};

Routes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  getRoutes: PropTypes.func.isRequired,
  selectRoute: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  map: state.map,
  routes: state.routes,
});

export default connect((mapStateToProps), {
  getRoutes,
  selectRoute,
})(Routes);
