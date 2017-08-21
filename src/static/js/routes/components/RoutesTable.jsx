import React from 'react';
import PropTypes from 'prop-types';

const RoutesTable = ({ routes, selectRoute }) => (
  <div className="small-12 columns">
    <h2 className="Ta(c)">Lista de Rutas</h2>
    <table className="hover unstriped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {routes.map(r => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.category}</td>
            <td>
              <button className="btn btn-default btn-success" onClick={() => selectRoute(r)}><i className="fa fa-map" /> Ver en Mapa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

RoutesTable.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectRoute: PropTypes.func.isRequired,
};

export default RoutesTable;
