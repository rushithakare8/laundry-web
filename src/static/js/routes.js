import $ from 'jquery';
import io from 'socket.io';

$(document).ready(() => {
  const client = io();
  client.on('getRoutes', (data) => {
    console.log('Socket.io data', data);
  });
  client.on('routeUpdates', (data) => {
    console.log('Socket.io UPDATES: ', data);
  });
});
