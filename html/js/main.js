"use strict";

dynamicHeightToolbar();
window.addEventListener("resize", function () {
  dynamicHeightToolbar();
});
function toggleMenu() {
  var modal = document.querySelector('.js-burger-menu'),
    btnOpen = document.querySelector('.js-open-burger'),
    btnClose = document.querySelector('.js-close-burger');
  btnOpen.addEventListener('click', function () {
    modal.classList.add('is-open');
  });
  btnClose.addEventListener('click', function () {
    modal.classList.remove('is-open');
  });
}
;
toggleMenu();
function dynamicHeightToolbar() {
  if (window.innerWidth < 1200) {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  } else {
    document.documentElement.style.removeProperty('--vh');
  }
} // calc window height without toolbar on mobile browser