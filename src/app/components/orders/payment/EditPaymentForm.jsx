import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Cleave from 'cleave.js';
import InputField from '../../fields/InputField';
import { validate } from '../../../data/validators/payments';

class EditPaymentForm extends React.Component {
  componentDidMount() {
    return new Cleave('#cardNumber', {
      creditCard: true,
    });
  }
  render() {
    const { handleSubmit, cancelHandler, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field component="input" type="hidden" name="idClient" />
        <Field component="input" type="hidden" name="stripeCustumerId" />
        <div className="ui grid">
          <div className="row">
            <div className="column">
              <Field component={InputField} id="cardNumber" type="text" name="cardNumber" placeholder="Numero de Targeta" />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="ui three column grid">
                <div className="column">
                  <Field component={InputField} type="text" name="cardExpMonth" placeholder="Mes" />
                </div>
                <div className="column">
                  <Field component={InputField} type="text" name="cardExpYear" placeholder="Año" />
                </div>
                <div className="column">
                  <Field component={InputField} type="text" name="cardCvc" placeholder="CVC" />
                </div>
              </div>
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
  }
}

EditPaymentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'editAddressForm',
  validate,
})(EditPaymentForm);
