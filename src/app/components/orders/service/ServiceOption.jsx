import React, { PropTypes } from 'react';
import SpecOptions from './SpecOptions';

const ServiceOption = ({ service, addServiceToCart, updateServiceOnCart, removeServiceFromCart, isRoot }) => {
  const addServiceHandler = () => addServiceToCart(service);
  const removeServiceHandler = () => removeServiceFromCart(service);
  return (
    <div>
      <div className="title">
        {isRoot ? <i className="fa fa-shopping-basket"></i> : null}
        <span>{service.name}</span>
      </div>
      <div className={isRoot ? 'content' : ''}>
        <div>{service.description}, ${service.price}</div>
        <div>
          {!isRoot ? (
            <button className="ui icon button" onClick={addServiceHandler}>
              <i className="fa fa-plus"></i>
            </button>
          ) : null}
          {isRoot ? (
            <button className="ui icon button" onClick={removeServiceHandler}>
              <i className="fa fa-minus"></i>
            </button>
          ) : null}
        </div>
        <div className="ui grid">
          {service.specs && isRoot ? service.specs.map((spec, idx) => (
            <SpecOptions
              key={idx} spec={spec}
              idServiceType={service.idServiceType}
              updateServiceOnCart={updateServiceOnCart}
            />
          )) : null}
        </div>
      </div>
    </div>
  );
};

ServiceOption.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  service: PropTypes.object.isRequired,
  addServiceToCart: PropTypes.func,
  updateServiceOnCart: PropTypes.func,
  removeServiceFromCart: PropTypes.func,
};

export default ServiceOption;
