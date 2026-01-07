"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
    var isSlideTopScrollTriggerObj = {
      start: "top bottom",
      toggleActions: "play none none none"
    };
    var animateCreate = function animateCreate(el, objProperty) {
      var objScrollTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isSlideTopScrollTriggerObj;
      var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      document.querySelectorAll(el).forEach(function (el, i) {
        gsap.to(el, _objectSpread(_objectSpread({}, objProperty), {}, {
          delay: i * delay,
          scrollTrigger: _objectSpread({
            trigger: el
          }, objScrollTrigger)
        }));
      });
    };
    animateCreate(".".concat(loadClass, " .is-slide-top"), {
      y: 0,
      opacity: 1,
      duration: speed,
      ease: "power3.inOut"
    });
    animateCreate(".".concat(loadClass, " .is-zoom"), {
      scale: 1,
      duration: speed,
      ease: "power2.inOut"
    });
    gsap.to(".".concat(loadClass, " .is-slide-left"), {
      x: 0,
      opacity: 1,
      duration: speed * 1.1,
      ease: "power3.inOut"
    });
    var imagesSlideTopBounce = {
      y: 0,
      duration: speed,
      ease: "back.out"
    };
    var imagesSlideTop = {
      y: 0,
      duration: speed,
      ease: "power3.out"
    };
    var heroAnimTl = gsap.timeline();
    heroAnimTl.to(".".concat(loadClass, " .is-hero-decor-animation-bounce"), _objectSpread(_objectSpread({}, imagesSlideTopBounce), {}, {
      delay: 0.5,
      stagger: {
        each: 0.3
      }
    })).to(".".concat(loadClass, " .is-hero-decor-animation-delay"), _objectSpread({}, imagesSlideTop), "1");
    animateCreate(".".concat(loadClass, " .is-about-decor-animation-bounce"), imagesSlideTopBounce, {
      start: "top 120%",
      toggleActions: "play none none none"
    }, speed / 3);
    animateCreate(".".concat(loadClass, " .is-about-decor-animation"), imagesSlideTop, isSlideTopScrollTriggerObj, speed);
    var bannerSlideRight = gsap.timeline();
    var wheelEnable = true;
    var hasBannerPlayed = false;
    bannerSlideRight.to(".".concat(loadClass, " .is-slide-right"), {
      x: 0,
      duration: speed * 0.8,
      visibility: "visible",
      ease: "power2.in"
    }).to(".".concat(loadClass, " .is-fade-out-bg__lower-level"), {
      opacity: 1,
      duration: speed * 1.1,
      visibility: "visible",
      ease: "power2.out",
      onComplete: function onComplete() {
        wheelEnable = true;
        hasBannerPlayed = true;
        currentIndex += 1;
      },
      onReverseComplete: function onReverseComplete() {
        wheelEnable = true;
        hasBannerPlayed = false;
        currentIndex -= 1;
      }
    });
    bannerSlideRight.pause();
    var sections = document.querySelectorAll('.js-sections');
    var fixedLogo = document.querySelector(".".concat(loadClass)).querySelector('.js-fixed-element');
    var fixedSocial = document.querySelector(".".concat(loadClass)).querySelector('.js-fixed-social');
    var bannerIndex = _toConsumableArray(sections).indexOf(document.querySelector('.section-decor'));
    var currentIndex = 0,
      logoPosition = 0,
      toolbarIndex = currentIndex;
    var scrollLogo = function scrollLogo(index) {
      var mod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      logoPosition = (window.innerHeight + 200) * index + 200 * mod;
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
      wheelEnable = false;
      var scrollDirection = index > currentIndex ? 'down' : 'up';
      var scrollIndex = index;
      if (bannerIndex === index && !hasBannerPlayed) {
        bannerSlideRight.play();
        return;
      }
      if (bannerIndex - 1 === index && hasBannerPlayed) {
        bannerSlideRight.reverse();
        return;
      }
      if (scrollDirection === 'down') {
        toolbarIndex += 1;
      } else {
        toolbarIndex -= 1;
      }
      if (bannerIndex === index && scrollDirection === 'up') {
        scrollIndex = index - 1;
        toolbarIndex = scrollIndex;
      }
      gsap.to(fixedSocial, {
        scrollTrigger: {
          trigger: '.js-fixed-social'
        },
        y: toolbarIndex * window.innerHeight,
        duration: speed
      });
      var mod = 0;
      if (sections[index] === document.querySelector('.section-icon')) {
        mod = 1;
      }
      scrollLogo(toolbarIndex, mod);
      gsap.to(window, {
        scrollTo: sections[scrollIndex],
        duration: speed,
        onComplete: function onComplete() {
          currentIndex = index;
          wheelEnable = true;
        }
      });
    };
    window.addEventListener("wheel", function (event) {
      event.preventDefault();
      if (wheelEnable !== false) {
        if (event.deltaY > 0) {
          goToSection(currentIndex + 1);
        } else {
          goToSection(currentIndex - 1);
        }
      }
    }, {
      passive: false
    });
    fixedLogo.addEventListener('click', function () {
      goToSection(0);
    });
  }
});