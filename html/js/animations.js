"use strict";

var styleObj = getComputedStyle(document.documentElement),
  desktopMedia = styleObj.getPropertyValue('--desktop');
var loadClass = 'is-animation-load';
var speed = styleObj.getPropertyValue('--speed-large');
speed = parseFloat(speed) / 1000;
gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', function () {
  if (window.innerWidth >= desktopMedia) {
    var animatedBody = document.querySelector('body');
    animatedBody === null || animatedBody === void 0 || animatedBody.classList.add(loadClass);
    gsap.to(".".concat(loadClass, " .is-slide-top"), {
      y: 0,
      opacity: 1,
      duration: speed,
      ease: "power3.inOut",
      delay: 0
    });
    gsap.to(".".concat(loadClass, " .is-zoom"), {
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
        case currentIndex < index:
          logoPosition = (window.innerHeight + 200) * index;
          break;
        default:
          logoPosition = logoPosition - (window.innerHeight + 200) * index;
      }
      gsap.to(fixedLogo, {
        scrollTrigger: {
          trigger: '.js-fixed-element'
        },
        y: logoPosition,
        duration: speed
      });
    };
    var animationsObj = function animationsObj(index) {
      switch (index) {
        case 3:
          gsap.to(".".concat(loadClass, " .is-slide-right"), {
            x: 0,
            duration: speed * 0.8,
            ease: "power2.in"
          });
          gsap.to(".".concat(loadClass, " .is-fade-out-bg__lower-level"), {
            opacity: 1,
            duration: speed * 1.1,
            ease: "power2.out"
          });
          break;
      }
    };
    var goToSection = function goToSection(index) {
      if (index < 0 || index >= sections.length) return;
      scrollLogo(index);
      animationsObj(index);
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