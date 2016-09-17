/* global Stripe */

export const validate = (values) => {
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

export default validate;
