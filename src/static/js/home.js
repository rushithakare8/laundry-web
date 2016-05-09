/* global $, noty */

const menu = $('#menu');
const header = $('#header');
const menuToggle = $('.menuToggle');

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

menuToggle.click(() => {
  menu.toggleClass('hide');
});

$('.type-select').on('click', evt => {
  const elem = $(evt.currentTarget).data();
  $('.type-section').addClass('hide');
  $(`#${elem.target}`).removeClass('hide');
  evt.preventDefault();
});

$(document).foundation();
$(document).ready(() => {
});
