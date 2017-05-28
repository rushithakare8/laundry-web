import React from 'react';
import PropTypes from 'prop-types';

const RouteStops = ({ selectedRoute }) => (
  <div className="small-10 columns">
    <h4>Paradas:</h4>
    <table>
      <thead>
        <tr>
          <th>Direccion</th>
          <th>Hora</th>
          <th>Espera</th>
        </tr>
      </thead>
      <tbody>
        {selectedRoute.addresses.map((stop, idx) => (
          <tr key={idx}>
            <td>
              {stop.address} {stop.address2}, {stop.city}, {stop.state} {stop.zipcode}
            </td>
            <td>
              {stop.arrival}
            </td>
            <td>
              {stop.waitTime} min.
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

RouteStops.propTypes = {
  selectedRoute: PropTypes.object.isRequired,
};

export default RouteStops;
