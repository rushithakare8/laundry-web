/* global $, noty, AccountKit, fbAccount */

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './data/configureStore';

const menu = $('#menu');
const header = $('#header');
const menuToggle = $('.menuToggle');

menuToggle.click(() => {
  menu.toggleClass('hide');
});

const initCalculator = () => {
  const initialState = window.initialState;
  const store = configureStore(initialState);

  ReactDOM.render(
    <Root history={history} routes={routes} store={store} />,
    document.getElementById('container')
  );

}

$(document).ready(() => {

  $('#shorts').waypoint({
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

  $(document).foundation();

});

// Initialize Account Kit with csrf protection
// eslint-disable-next-line
function AccountKit_OnInteractive() {
  AccountKit.init({
    appId: fbAccount.appId,
    state: fbAccount.csrf,
    version: fbAccount.version,
  });
}

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

const PHONE_REHEX = /^\d{10}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validatePhone = (number) => PHONE_REHEX.test(number);
const validateEmail = (email) => EMAIL_REGEX.test(email);

// phone form submission handler
// eslint-disable-next-line
function loginWithPhone() {
  const countryCode = '+1';
  const phoneNumber = document.getElementById('phoneNumber').value;
  if (validatePhone(phoneNumber)) {
    return AccountKit.login('PHONE', { countryCode, phoneNumber }, accountKitCallback);
  }
  return showError('Por favor ingresa un Telefono valido');
}


// email form submission handler
// eslint-disable-next-line
function loginWithEmail() {
  const emailAddress = document.getElementById('emailAddress').value;
  if (validateEmail(emailAddress)) {
    return AccountKit.login('EMAIL', { emailAddress }, accountKitCallback);
  }
  return showError('Por favor ingresa un Correo Electronico valido');
}
