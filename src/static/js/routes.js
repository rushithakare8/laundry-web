/* global google */
import $ from 'jquery';
import io from 'socket.io';

const initMap = (directions) => {
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 },
  });
  directionsDisplay.setMap(map);
  console.log(directions);
  directionsDisplay.setDirections(directions);
};

$(document).ready(() => {
  const client = io();
  client.on('getRoutes', (data) => {
    initMap(data);
    console.log('Socket.io data', data);
  });
  client.on('routeUpdates', (data) => {
    console.log('Socket.io UPDATES: ', data);
  });
});
