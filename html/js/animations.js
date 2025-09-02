"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var styleObj = getComputedStyle(document.documentElement),
  desktopMedia = styleObj.getPropertyValue('--desktop');
var loadClass = 'is-animation-load';
var speed = styleObj.getPropertyValue('--speed-large');
speed = parseFloat(speed) / 1000;
window.addEventListener('load', function () {
  if (window.innerWidth >= desktopMedia) {
    var animatedBody = document.querySelector('body');
    animatedBody === null || animatedBody === void 0 || animatedBody.classList.add(loadClass);
    var i = 0;
    var animateCreate = function animateCreate(el, objProperty, objScrollTrigger) {
      var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      document.querySelectorAll(el).forEach(function (el) {
        i = i + 1;
        gsap.to(el, _objectSpread(_objectSpread({}, objProperty), {}, {
          delay: i * delay,
          scrollTrigger: _objectSpread({
            trigger: el
          }, objScrollTrigger)
        }));
      });
    };
    var isSlideTopObj = {
        y: 0,
        opacity: 1,
        duration: speed,
        ease: "power3.inOut"
      },
      isSlideTopScrollTriggerObj = {
        start: "top bottom",
        toggleActions: "play none none none"
      };
    animateCreate(".".concat(loadClass, " .is-slide-top"), isSlideTopObj, isSlideTopScrollTriggerObj);
    animateCreate(".".concat(loadClass, " .is-slide-top-delay"), isSlideTopObj, isSlideTopScrollTriggerObj, 0.1);
    animateCreate(".".concat(loadClass, " .is-zoom"), {
      scale: 1,
      duration: speed,
      ease: "power2.inOut"
    }, {
      start: "top bottom",
      toggleActions: "play none none none"
    });
    gsap.to(".".concat(loadClass, " .is-slide-left"), {
      x: 0,
      opacity: 1,
      duration: speed * 1.1,
      ease: "power3.inOut"
    });
    var heroAnimTl = gsap.timeline();
    heroAnimTl.to(".".concat(loadClass, " .is-hero-decor-animation-bounce"), {
      y: 0,
      duration: speed,
      ease: "back.out",
      delay: 0.5,
      stagger: {
        each: 0.3
      }
    }).to(".".concat(loadClass, " .is-hero-decor-animation-delay"), {
      y: 0,
      duration: speed,
      ease: "power3.out"
    }, "1");
    var bannerSlideRight = gsap.timeline({
      scrollTrigger: {
        trigger: ".".concat(loadClass, " .is-slide-right"),
        start: "top top",
        toggleActions: "play reverse play reverse"
      }
    });
    bannerSlideRight.to(".".concat(loadClass, " .is-slide-right"), {
      x: 0,
      duration: speed * 0.8,
      visibility: "visible",
      ease: "power2.in"
    }).to(".".concat(loadClass, " .is-fade-out-bg__lower-level"), {
      opacity: 1,
      duration: speed * 1.1,
      visibility: "visible",
      ease: "power2.out"
    });
    bannerSlideRight.paused();
    var sections = document.querySelectorAll('.js-sections');
    var fixedLogo = document.querySelector(".".concat(loadClass)).querySelector('.js-fixed-element');
    var currentIndex = 0,
      logoPosition = 0;
    var scrollLogo = function scrollLogo(index) {
      console.log(index);
      switch (true) {
        case index === 0:
          logoPosition = 0;
          break;
        case index === 3:
          console.log('True');
          break;
        default:
          logoPosition = (window.innerHeight + 200) * index;
          break;
      }
      gsap.to(fixedLogo, {
        scrollTrigger: {
          trigger: '.js-fixed-element'
        },
        y: logoPosition,
        duration: speed
      });
    };
    var goToSection = function goToSection(index) {
      if (index < 0 || index >= sections.length) return;
      scrollLogo(index);
      gsap.to(window, {
        scrollTo: sections[index],
        duration: speed,
        onComplete: function onComplete() {
          currentIndex = index;
        }
      });
    };
    window.addEventListener("wheel", function (event) {
      if (event.deltaY > 0) {
        goToSection(currentIndex + 1);
      } else {
        goToSection(currentIndex - 1);
      }
    });
    fixedLogo.addEventListener('click', function () {
      goToSection(0);
    });
  }
});