import React, { PropTypes } from 'react';
import cx from 'classnames';

const ServiceTypes = ({ serviceTypes, idServiceType, onServiceTypeChange }) => (
  <div className="column small-12 My(7px)">
    {serviceTypes ? (
      <div className="expanded button-group">
        {serviceTypes.map((serv) => {
          const onClick = () => onServiceTypeChange(serv.idServiceType);
          return (
            <a
              onClick={onClick}
              key={serv.idServiceType}
              className={cx('button', { selected: serv.idServiceType === idServiceType })}
            >
              {serv.name}
            </a>
          );
        })}
      </div>
    ) : null}
  </div>
);

ServiceTypes.propTypes = {
  idServiceType: PropTypes.number.isRequired,
  serviceTypes: PropTypes.array.isRequired,
  onServiceTypeChange: PropTypes.func.isRequired,
};

export default ServiceTypes;
