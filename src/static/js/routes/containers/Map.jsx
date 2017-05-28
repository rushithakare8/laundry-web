/* global google */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  positionToAddress,
} from '../data/actions/map';
import {
  TERSUS_POSITION,
} from '../data/constants/utils';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { center: TERSUS_POSITION };
    this.onUpdateCenter = this.onUpdateCenter.bind(this);
    this.onSetDirections = this.onSetDirections.bind(this);
    this.onDragend = this.onDragend.bind(this);
    this.onClearMap = this.onClearMap.bind(this);
  }
  componentDidMount() {
    const { center } = this.state;
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(document.getElementById('routesMap'), { center, zoom: 16 });
    this.marker = new google.maps.Marker({ position: center, draggable: true, title: 'Tersus', map: this.map });
    this.marker.addListener('dragend', this.onDragend);
    this.directionsRenderer.setMap(this.map);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.map.center && (nextProps.map.center !== this.state.center)) {
      this.onUpdateCenter(nextProps.map.center);
    }
    if (nextProps.map.directions && (nextProps.map.directions !== this.state.directions)) {
      this.onSetDirections(nextProps.map.directions);
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  onUpdateCenter(center) {
    this.onClearMap();
    this.map.setCenter(center);
    this.marker.setMap(this.map);
    this.marker.setPosition(center);
    this.setState({ center, directions: null });
  }
  onSetDirections(directions) {
    this.onClearMap();
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setDirections(directions);
    this.setState({ directions, center: null });
  }
  onClearMap() {
    this.marker.setMap(null);
    this.directionsRenderer.setMap(null);
  }
  onDragend(evt) {
    const position = {
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
    };
    this.props.positionToAddress(position);
  }
  render() {
    return (
      <div id="routesMap" style={{ height: '500px' }} />
    );
  }
}

Map.propTypes = {
  map: PropTypes.object.isRequired,
  positionToAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  map: state.map,
});

export default connect((mapStateToProps), {
  positionToAddress,
})(Map);
