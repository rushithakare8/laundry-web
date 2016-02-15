'use strict'
/*global LW*/

let menu = $('#menu');
let header = $('#header');
let menuToggle = $('.menuToggle')
let headerWaypoint = $('#shorts').waypoint({
  handler(direction) {
    if (direction === 'down') {
      header.removeClass('alt')
    } else {
      header.addClass('alt')
    }
  }
})

menuToggle.click(() => {
  menu.toggleClass('hide')
})

$.noty.defaults = {
  layout: 'top'
}

$.noty.defaults = {
  layout: 'top',
  theme: 'relax', // or 'relax'
  type: 'alert',
  text: '', // can be html or string
  dismissQueue: true, // If you want to use queue feature set this true
  template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
  animation: {
    open: 'animated bounceInLeft', // Animate.css class names
    close: 'animated bounceOutLeft', // Animate.css class names
  },
  timeout: 3000, // delay for closing event. Set false for sticky notifications
  force: false, // adds notification to the beginning of queue when set to true
  modal: false,
  maxVisible: 5, // you can set max visible notification for dismissQueue true option,
  killer: false, // for close all notifications before show
  // closeWith: ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
  callback: {
    onShow: function() {},
    afterShow: function() {},
    onClose: function() {},
    afterClose: function() {},
    onCloseClick: function() {},
  }
}

$(document).foundation();
$(document).ready(() => {
  const errors = LW.PAGE.home.view.error;
  if (errors && errors.loginError) {
    let notification = noty({
      text: 'There was an errror when login in, please try again',
      type: 'error'
    })
  }
})
