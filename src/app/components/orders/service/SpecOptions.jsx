import React, { PropTypes } from 'react';
import SpecOptionSelector from './SpecOptionSelector';

const SpecOptions = ({ cart, spec, idServiceType, updateSpecOnCart, addSpecOnCart, removeSpecOnCart, price }) => {
  const addSpecHandler = () => addSpecOnCart(idServiceType, spec);
  const removeSpecHandler = () => removeSpecOnCart(idServiceType, spec.idSpecs);
  const updateSpecHandler = (option) => updateSpecOnCart(idServiceType, spec.idSpecs, option);
  const quantity = cart.services.filter(ser => ser.idServiceType === idServiceType)[0].specs.filter(sp => sp.idSpecs === spec.idSpecs)[0].quantity;
  const showRemove = (spec.optional === 0 && quantity > 1) || (spec.optional !== 0 && quantity > 0);
  const showAdd = spec.max_qty > quantity;
  let increment = spec.serviceIncrement * price;
  increment = spec.specPrice > 0 ? spec.specPrice * quantity : increment;
  return (
    <div className="five column row">
      <div className="column">
        {spec.description}
      </div>
      <div className="column">
        <SpecOptionSelector onChange={updateSpecHandler} specOptions={spec.options[spec.idSpecs]} idSpecs={spec.idSpecs} />
      </div>
      <div className="column">
        {increment > 0 ? (
          <span>${increment}</span>
        ) : (
          <span>Incluido</span>
        )}
      </div>
      <div className="column">{quantity}</div>
      <div className="column">
        {showRemove ? (
          <button className="ui icon button" onClick={removeSpecHandler}>
            <i className="fa fa-minus"></i>
          </button>
        ) : null}
        {showAdd ? (
          <button className="ui icon button" onClick={addSpecHandler}>
            <i className="fa fa-plus"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

SpecOptions.propTypes = {
  cart: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  idServiceType: PropTypes.number.isRequired,
  addSpecOnCart: PropTypes.func.isRequired,
  removeSpecOnCart: PropTypes.func.isRequired,
  updateSpecOnCart: PropTypes.func.isRequired,
};

export default SpecOptions;
