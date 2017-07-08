import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteStops from '../components/RouteStops';
import {
  positionToAddress as center,
} from '../data/actions/map';
import {
  TERSUS_POSITION,
} from '../data/constants/utils';

const MapDetails = ({ map, selectedRoute, positionToAddress }) => (
  <div className="row Py(7px)">
    {selectedRoute && (
      <RouteStops selectedRoute={selectedRoute} />
    )}
    <div className="Ta(end) small-2 columns">
      <button type="button" className="btn btn-primary" onClick={() => positionToAddress(TERSUS_POSITION)}>
        <i className="fa fa-map-marker" /> <span className="Mx(7px)">Regresar a Tersus</span>
      </button>
    </div>
  </div>
);

MapDetails.defaultProps = {
  selectedRoute: null,
};

MapDetails.propTypes = {
  map: PropTypes.object.isRequired,
  selectedRoute: PropTypes.object,
  positionToAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  map: state.map,
});

export default connect((mapStateToProps), {
  positionToAddress: center,
})(MapDetails);
