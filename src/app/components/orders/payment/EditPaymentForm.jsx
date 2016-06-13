import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Map } from 'immutable';
import cx from 'classnames';
import { validate } from '../../../data/validators/payments';

const EditPaymentForm = ({ fields, handleSubmit, cancelHandler, submitting }) => {
  const base = 'ui fluid input';
  const vFields = new Map(fields).map(f => cx(base, { error: f.touched && f.error })).toObject();
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" { ...fields.idClient } />
      <input type="hidden" { ...fields.stripeCustumerId } />
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <div className={vFields.cardNumber}>
              <label htmlFor="cardNumber"></label>
              <input type="text" placeholder="Numero de Targeta" maxLength="16" pattern="[0-9]" { ...fields.cardNumber } />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="ui three column grid">
              <div className="column">
                <div className={vFields.cardExpMonth}>
                  <label htmlFor="cardExpMonth"></label>
                  <input type="text" placeholder="Mes" maxLength="2" pattern="[0-9]" { ...fields.cardExpMonth } />
                </div>
              </div>
              <div className="column">
                <div className={vFields.cardExpYear}>
                  <label htmlFor="cardExpYear"></label>
                  <input type="text" placeholder="Año" maxLength="4" pattern="[0-9]" { ...fields.cardExpYear } />
                </div>
              </div>
              <div className="column">
                <div className={vFields.cardCvc}>
                  <label htmlFor="cardCvc"></label>
                  <input type="text" placeholder="CVC" maxLength="4" pattern="[0-9]" { ...fields.cardCvc } />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column Ta(e)">
            <button className="ui icon button" type="button" onClick={cancelHandler} disabled={submitting}>
              <i className="fa fa-times"></i>
              <span className="Mstart(10px)">Cancelar</span>
            </button>
            <button className="ui icon button" type="submit" onClick={handleSubmit} disabled={submitting}>
              <i className="fa fa-floppy-o"></i>
              <span className="Mstart(10px)">Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

EditPaymentForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'editAddressForm',
  fields: ['cardNumber', 'cardCvc', 'cardExpMonth', 'cardExpYear', 'idClient', 'stripeCustumerId'],
  validate,
})(EditPaymentForm);
