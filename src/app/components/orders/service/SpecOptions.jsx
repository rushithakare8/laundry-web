import React, { PropTypes } from 'react';
import SpecOptionSelector from './SpecOptionSelector';

const SpecOptions = ({ spec, idServiceType, updateSpecOnCart, addSpecOnCart, removeSpecOnCart, price }) => {
  const addSpecHandler = () => addSpecOnCart(idServiceType, spec);
  const removeSpecHandler = () => removeSpecOnCart(idServiceType, spec.idSpecs);
  const updateSpecHandler = (option) => updateSpecOnCart(idServiceType, spec.idSpecs, option);
  return (
    <div className="four column row">
      <div className="column">
        {spec.description}
      </div>
      <div className="column">
        <SpecOptionSelector onChange={updateSpecHandler} specOptions={spec.options[spec.idSpecs]} idSpecs={spec.idSpecs} />
      </div>
      <div className="column">
        {spec.serviceIncrement > 0 ? (
          <span>${(spec.serviceIncrement * price)}</span>
        ) : (
          <span>Incluido</span>
        )}
      </div>
      {spec.optional !== 0 ? (
        <div className="column">
          <button className="ui icon button" onClick={addSpecHandler}>
            <i className="fa fa-plus"></i>
          </button>
          <button className="ui icon button" onClick={removeSpecHandler}>
            <i className="fa fa-minus"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

SpecOptions.propTypes = {
  spec: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  idServiceType: PropTypes.number.isRequired,
  addSpecOnCart: PropTypes.func.isRequired,
  removeSpecOnCart: PropTypes.func.isRequired,
  updateSpecOnCart: PropTypes.func.isRequired,
};

export default SpecOptions;
