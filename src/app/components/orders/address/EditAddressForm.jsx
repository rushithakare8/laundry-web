import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate } from '../../../data/validators/address';
import InputField from '../../fields/InputField';

const EditAddressForm = ({ handleSubmit, cancelHandler, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field component="input" type="hidden" name="idAddress" />
    <Field component="input" type="hidden" name="idClient" />
    <div className="ui two column grid">
      <div className="row">
        <div className="sixteen wide column">
          <Field component={InputField} type="text" name="address" placeholder="Direccion" />
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <Field component={InputField} type="text" name="address2" placeholder="Interior #" />
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <Field component={InputField} type="text" name="country" placeholder="Pais" />
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <Field component={InputField} type="text" name="city" placeholder="Ciudad" />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Field component={InputField} type="text" name="state" placeholder="Estado" />
        </div>
        <div className="column">
          <Field component={InputField} type="text" name="zipcode" placeholder="Codigo Postal" />
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column Ta(e)">
          <button className="ui icon button" type="button" onClick={cancelHandler} disabled={submitting}>
            <i className="fa fa-times" />
            <span className="Mstart(10px)">Cancelar</span>
          </button>
          <button className="ui icon button" type="submit" onClick={handleSubmit} disabled={submitting}>
            <i className="fa fa-floppy-o" />
            <span className="Mstart(10px)">Guardar</span>
          </button>
        </div>
      </div>
    </div>
  </form>
);

EditAddressForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'editAddressForm',
  validate,
})(EditAddressForm);
