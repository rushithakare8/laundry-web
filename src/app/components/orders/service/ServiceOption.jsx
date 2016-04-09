import React, { PropTypes } from 'react';
import SpecOptions from './SpecOptions';

const ServiceOption = ({ service, addServiceToCart, updateServiceOnCart, removeServiceFromCart, isRoot }) => {
  const addServiceHandler = () => addServiceToCart(service);
  const removeServiceHandler = () => removeServiceFromCart(service);
  const specs = service.specs && isRoot ? service.specs.map((spec, idx) => (
    <SpecOptions key={ idx } spec={ spec }
      idServiceType={ service.idServiceType }
      updateServiceOnCart={ updateServiceOnCart }
    />
  )) : null;
  const icon = isRoot ? <i className="fa fa-shopping-basket"></i> : null;
  const addButton = !isRoot ? (
    <button className="ui icon button" onClick={ addServiceHandler }>
      <i className="fa fa-plus"></i>
    </button>
  ) : null;
  const removeButton = isRoot ? (
    <button className="ui icon button" onClick={ removeServiceHandler }>
      <i className="fa fa-minus"></i>
    </button>
  ) : null;
  return (
    <div>
      <div className="title">
        { icon }
        <span>{ service.name }</span>
      </div>
      <div className={ isRoot ? 'content' : ''}>
        <div>{ service.description }, ${ service.price }</div>
        <div>
          { addButton }
          { removeButton }
        </div>
        <div className="ui grid">
          { specs }
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
