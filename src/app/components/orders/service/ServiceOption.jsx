import React from 'react';
import PropTypes from 'prop-types';
import SpecOptions from './SpecOptions';

const ServiceOption = ({ cart, service, addServiceToCart, removeServiceFromCart, addSpecOnCart, updateSpecOnCart, removeSpecOnCart, isRoot }) => {
  const addServiceHandler = () => addServiceToCart(service);
  const removeServiceHandler = () => removeServiceFromCart(service);
  return (
    <div>
      <div className="title">
        {isRoot ? <i className="fa fa-shopping-basket" /> : null}
        <span>{service.name}</span>
      </div>
      <div className={isRoot ? 'content' : ''}>
        <div>{service.description}, ${service.price}</div>
        <div>
          {!isRoot ? (
            <button className="ui icon button" onClick={addServiceHandler}>
              <i className="fa fa-plus" />
            </button>
          ) : null}
          {isRoot ? (
            <button className="ui icon button" onClick={removeServiceHandler}>
              <i className="fa fa-minus" />
            </button>
          ) : null}
        </div>
        {service.specs && isRoot ? (
          <div className="ui grid">
            <div className="five column row">
              <div className="column">Opcion</div>
              <div className="column" />
              <div className="column">Precio</div>
              <div className="column">Cantidad</div>
            </div>
            {service.specs.map(spec => (
              <SpecOptions
                key={service.idServiceType}
                spec={spec}
                idServiceType={service.idServiceType}
                price={service.price}
                cart={cart}
                addSpecOnCart={addSpecOnCart}
                updateSpecOnCart={updateSpecOnCart}
                removeSpecOnCart={removeSpecOnCart}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

ServiceOption.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  cart: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  addServiceToCart: PropTypes.func.isRequired,
  removeServiceFromCart: PropTypes.func.isRequired,
  addSpecOnCart: PropTypes.func.isRequired,
  updateSpecOnCart: PropTypes.func.isRequired,
  removeSpecOnCart: PropTypes.func.isRequired,
};

export default ServiceOption;
