/* global $, noty, AccountKit, fbAccount, isAuthenticated */
import React from 'react';
import ReactDOM from 'react-dom';
import FieldKit from 'field-kit';
import configureStore from './calc/data/configureStore';
import PriceCalculator from './calc/PriceCalculator';

// import './progress';

const PHONE_REHEX = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/g;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validatePhone = (number) => PHONE_REHEX.test(number);
const validateEmail = (email) => EMAIL_REGEX.test(email);

const menu = $('#menu');
const header = $('#header');
const menuToggle = $('.menuToggle');

const handleStartOrder = () => {
  if (isAuthenticated) {
    window.location = '/main';
    return null;
  }
  return $('#login-modal').foundation('open');
};

const initCalculator = () => {
  const store = configureStore();
  const elem = document.getElementById('PriceCalculator');
  if (elem) {
    // eslint-disable-next-line
    ReactDOM.render(<PriceCalculator store={store} handleStartOrder={handleStartOrder} />, elem);
  }
};

menuToggle.click(() => {
  menu.toggleClass('hide');
});

const showError = (msg) => noty({
  text: msg,
  type: 'error',
  timeout: 2000,
});

// login callback
function accountKitCallback(response) {
  if (response.status === 'PARTIALLY_AUTHENTICATED') {
    document.getElementById('code').value = response.code;
    document.getElementById('csrf_nonce').value = response.state;
    document.getElementById('AccountKitForm').submit();
  } else if (response.status === 'NOT_AUTHENTICATED') {
    showError('Codigo ingresado incorrecto');
  } else if (response.status === 'BAD_PARAMS') {
    showError('Error en el servidor, intenta nuevamente');
  }
}

// phone form submission handler
const loginWithPhone = () => {
  const countryCode = '+1';
  const phoneNumberField = document.getElementById('phoneNumber');
  const phoneNumber = phoneNumberField.value;
  if (validatePhone(phoneNumber)) {
    phoneNumberField.className = '';
    return AccountKit.login('PHONE', { countryCode, phoneNumber }, accountKitCallback);
  }
  phoneNumberField.className = 'is-invalid-input';
  return showError('Por favor ingresa un Telefono valido');
};

// email form submission handler
const loginWithEmail = () => {
  const emailAddressField = document.getElementById('emailAddress');
  const emailAddress = emailAddressField.value;
  if (validateEmail(emailAddress)) {
    emailAddressField.className = '';
    return AccountKit.login('EMAIL', { emailAddress }, accountKitCallback);
  }
  emailAddressField.className = 'is-invalid-input';
  return showError('Por favor ingresa un Correo Electronico valido');
};

$(document).ready(() => {
  $('.menuWaypoint').waypoint({
    offset: 60,
    handler(direction) {
      if (direction === 'down') {
        header.removeClass('alt');
      } else {
        header.addClass('alt');
      }
    },
  });

  $('.type-select').on('click', evt => {
    const elem = $(evt.currentTarget).data();
    $('.type-section').addClass('hide');
    $(`#${elem.target}`).removeClass('hide');
    evt.preventDefault();
  });

  // eslint-disable-next-line
  const field = new FieldKit.TextField(document.getElementById('phoneNumber'), new FieldKit.PhoneFormatter());

  $('#loginWithPhone').on('click', () => loginWithPhone());

  $('#loginWithEmail').on('click', () => loginWithEmail());

  $('.initCalculator').on('click', () => initCalculator());

  $(document).foundation();
});
