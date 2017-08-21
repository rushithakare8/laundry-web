import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const ServiceTypes = ({ services, idServiceCategory, onServiceChange }) => (
  <div className="row align-center My(14px)">
    {services ? (
      services.map(serv => (
        <Option
          key={serv.idServiceCategory}
          idServiceCategory={serv.idServiceCategory}
          idServiceCategorySel={idServiceCategory}
          onServiceChange={onServiceChange}
        />
      ))
    ) : null}
  </div>
);

ServiceTypes.propTypes = {
  idServiceCategory: PropTypes.number.isRequired,
  services: PropTypes.array.isRequired,
  onServiceChange: PropTypes.func.isRequired,
};

export default ServiceTypes;
