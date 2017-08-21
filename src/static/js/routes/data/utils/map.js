/* global google */
import {
  TERSUS_POSITION,
} from '../constants/utils';

const geocoder = new google.maps.Geocoder();
const directionsService = new google.maps.DirectionsService();

export const getAddressByPosition = location => new Promise((resolve, reject) => {
  geocoder.geocode({ location }, (results, status) => {
    if (status === 'OK') {
      const address = results[0].formatted_address;
      return resolve(address);
    }
    return reject(`Geocoder failed due to: ${status}`);
  });
});

export const getPositionByAddress = address => new Promise((resolve, reject) => {
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      return resolve({ lat, lng });
    }
    return reject(`Error while trying to get the location: ${status}`);
  });
});

export const getRouteDirections = route => new Promise((resolve, reject) => {
  const waypoints = route.addresses.map(addrs => ({ location: { lat: addrs.lat, lng: addrs.lng } }));
  const options = {
    origin: TERSUS_POSITION,
    destination: TERSUS_POSITION,
    travelMode: 'DRIVING',
    waypoints,
  };
  directionsService.route(options, (results, status) => {
    if (status === 'OK') {
      return resolve(results);
    }
    return reject(`Error while trying to get the location: ${status}`);
  });
});
