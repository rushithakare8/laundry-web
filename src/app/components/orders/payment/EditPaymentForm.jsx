/* global Stripe */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import classNames from 'classnames';

const validate = values => {
  const errors = {};
  if (!values.cardNumber) {
    errors.cardNumber = 'Required';
  } else if (!Stripe.card.validateCardNumber(values.cardNumber)) {
    errors.cardNumber = 'Invalid Card Number';
  }
  if (!values.cardCvc) {
    errors.cardCvc = 'Required';
  } else if (!Stripe.card.validateCVC(values.cardCvc)) {
    errors.cardCvc = 'Invalid CVC';
  }
  if (!values.cardExpMonth) {
    errors.cardExpMonth = 'Required';
  }
  if (!values.cardExpYear) {
    errors.cardExpYear = 'Required';
  }
  if ((values.cardExpYear && values.cardExpMonth)
    && !Stripe.card.validateExpiry(`${values.cardExpMonth}/${values.cardExpYear}`)) {
    errors.cardExpYear = 'Invalid Expiration Date';
    errors.cardExpMonth = 'Invalid Expiration Date';
  }
  return errors;
};

const EditPaymentForm = ({ fields, handleSubmit, cancelHandler, submitting }) => {
  const base = 'ui fluid input';
  const cxCN = classNames(base, { error: fields.cardNumber.touched && fields.cardNumber.error });
  const cxCV = classNames(base, { error: fields.cardCvc.touched && fields.cardCvc.error });
  const cxCM = classNames(base, { error: fields.cardExpMonth.touched && fields.cardExpMonth.error });
  const cxCY = classNames(base, { error: fields.cardExpYear.touched && fields.cardExpYear.error });
  return (
    <form onSubmit={ handleSubmit }>
      <input type="hidden" { ...fields.idClient } />
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <div className={ cxCN }>
              <label htmlFor="cardNumber"></label>
              <input type="number" placeholder="Card Number" maxLength="19" pattern="[0-9]" { ...fields.cardNumber } />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="ui three column grid">
              <div className="column">
                <div className={ cxCM }>
                  <label htmlFor="cardExpMonth"></label>
                  <input type="number" placeholder="Month" maxLength="2" pattern="[0-9]" { ...fields.cardExpMonth } />
                </div>
              </div>
              <div className="column">
                <div className={ cxCY }>
                  <label htmlFor="cardExpYear"></label>
                  <input type="number" placeholder="Year" maxLength="4" pattern="[0-9]" { ...fields.cardExpYear } />
                </div>
              </div>
              <div className="column">
                <div className={ cxCV }>
                  <label htmlFor="cardCvc"></label>
                  <input type="number" placeholder="CVC" maxLength="4" pattern="[0-9]" { ...fields.cardCvc } />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column Ta(e)">
            <button className="ui icon button" type="button" onClick={ cancelHandler } disabled={ submitting }>
              <i className="fa fa-times"></i>
              <span className="Mstart(10px)">Cancel</span>
            </button>
            <button className="ui icon button" type="submit" onClick={ handleSubmit } disabled={ submitting }>
              <i className="fa fa-floppy-o"></i>
              <span className="Mstart(10px)">Save</span>
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
  fields: ['cardNumber', 'cardCvc', 'cardExpMonth', 'cardExpYear', 'idClient'],
  validate,
})(EditPaymentForm);
