/* global $, noty, loginError, AccountKit, fbAccount */

const menu = $('#menu');
const header = $('#header');
const menuToggle = $('.menuToggle');
const templateTxt = '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>';

$('#shorts').waypoint({
  handler(direction) {
    if (direction === 'down') {
      header.removeClass('alt');
    } else {
      header.addClass('alt');
    }
  },
});

menuToggle.click(() => {
  menu.toggleClass('hide');
});

$.noty.defaults = {
  layout: 'top',
};

$.noty.defaults = {
  layout: 'top',
  theme: 'relax', // or 'relax'
  type: 'alert',
  text: '', // can be html or string
  dismissQueue: true, // If you want to use queue feature set this true
  template: templateTxt,
  animation: {
    open: 'animated bounceInLeft', // Animate.css class names
    close: 'animated bounceOutLeft', // Animate.css class names
  },
  timeout: 3000, // delay for closing event. Set false for sticky notifications
  force: false, // adds notification to the beginning of queue when set to true
  modal: false,
  maxVisible: 5, // you can set max visible notification for dismissQueue true option,
  killer: false, // for close all notifications before show
  // backdrop click will close all notifications
  // closeWith: ['click', 'button', 'hover', 'backdrop']
  callback: {
    onShow: () => {},
    afterShow: () => {},
    onClose: () => {},
    afterClose: () => {},
    onCloseClick: () => {},
  },
};

$(document).foundation();
$(document).ready(() => {
  const errors = loginError;
  if (errors && errors.loginError) {
    noty({
      text: 'There was an errror when login in, please try again',
      type: 'error',
    });
  }
  // Initialization of the Facebook Account Kit
  // AccountKit.init({
  //   appId: fbAccount.appId,
  //   state: fbAccount.csrf,
  //   version: fbAccount.version,
  // });
});

// login callback
// function loginCallback(response) {
//   console.log(response);
//   if (response.status === 'PARTIALLY_AUTHENTICATED') {
//     document.getElementById('code').value = response.code;
//     document.getElementById('csrf_nonce').value = response.state;
//     document.getElementById('my_form').submit();
//   } else if (response.status === 'NOT_AUTHENTICATED') {
//     // handle authentication failure
//   } else if (response.status === 'BAD_PARAMS') {
//     // handle bad parameters
//   }
// }

// phone form submission handler
// function phoneBtnOnClick() {
//   const countryCode = document.getElementById('countryCode').value;
//   const phoneNumber = document.getElementById('phoneNumber').value;
//   AccountKit.login('PHONE', {
//     countryCode,
//     phoneNumber,
//   }, loginCallback);
// }

// email form submission handler
// function emailBtnOnClick() {
//   const emailAddress = document.getElementById('email').value;
//   AccountKit.login('EMAIL', {
//     emailAddress,
//   }, loginCallback);
// }
