const styleObj = getComputedStyle(document.documentElement),
    desktopMedia = styleObj.getPropertyValue('--desktop');

const loadClass = 'is-animation-load';

let speed = styleObj.getPropertyValue('--speed-large');
speed = parseFloat(speed) / 1000;

window.addEventListener('load', () => {

    if (window.innerWidth >= desktopMedia) {
        const animatedBody = document.querySelector('body');

        animatedBody?.classList.add(loadClass);

        let i = 0;

        const animateCreate = (el, objProperty, objScrollTrigger, delay = 0) => {
            document.querySelectorAll(el).forEach(el => {
                i = i + 1;

                gsap.to(el, {
                    ...objProperty,
                    delay: i * delay,
                    scrollTrigger: {
                        trigger: el,
                        ...objScrollTrigger
                    }
                });
            })
        }

        const isSlideTopObj = {
            y: 0,
            opacity: 1,
            duration: speed,
            ease: "power3.inOut",
        }, isSlideTopScrollTriggerObj = {
            start: "top bottom",
            toggleActions: "play none none none"
        }

        animateCreate(`.${loadClass} .is-slide-top`, isSlideTopObj, isSlideTopScrollTriggerObj);

        animateCreate(`.${loadClass} .is-slide-top-delay`, isSlideTopObj, isSlideTopScrollTriggerObj, 0.1);

        animateCreate(`.${loadClass} .is-zoom`, {
            scale: 1,
            duration: speed,
            ease: "power2.inOut",
        }, {
            start: "top bottom",
            toggleActions: "play none none none"
        });

        gsap.to(`.${loadClass} .is-slide-left`, {
            x: 0,
            opacity: 1,
            duration: speed * 1.1,
            ease: "power3.inOut"
        })

        const heroAnimTl = gsap.timeline();

        heroAnimTl
            .to(`.${loadClass} .is-hero-decor-animation-bounce`, {
                y: 0,
                duration: speed,
                ease: "back.out",
                delay: 0.5,
                stagger: {
                    each: 0.3,
                }
            })
            .to(`.${loadClass} .is-hero-decor-animation-delay`, {
                y: 0,
                duration: speed,
                ease: "power3.out"
            }, "1");

        const bannerSlideRight = gsap.timeline();
        const bannerPosition = document.querySelector(`.${loadClass} .is-fade-out-bg__lower-level`).getBoundingClientRect().top;
        let hasBannerPlayed = false,
            isBannerReady = false;

        bannerSlideRight
            .to(`.${loadClass} .is-slide-right`, {
                x: 0,
                duration: speed * 0.8,
                visibility: "visible",
                ease: "power2.in"
            })
            .to(`.${loadClass} .is-fade-out-bg__lower-level`, {
                opacity: 1,
                duration: speed * 1.1,
                visibility: "visible",
                ease: "power2.out",
                onComplete: () => {
                    hasBannerPlayed = true;
                    isBannerReady = false;
                },
                onReverseComplete: () => {
                    hasBannerPlayed = false;
                    isBannerReady = false;
                }
            })

        bannerSlideRight.pause();

        const sections = document.querySelectorAll('.js-sections');
        const fixedLogo = document.querySelector(`.${loadClass}`).querySelector('.js-fixed-element');
        const fixedSocial = document.querySelector(`.${loadClass}`).querySelector('.js-fixed-social');

        let currentIndex = 0,
            logoPosition = 0,
            currentPosition = 0;

        const scrollLogo = (index) => {

            switch (true) {
                case index === 0:
                    logoPosition = 0;
                    break;
                case index === 3:
                    break;
                default:
                    logoPosition = (window.innerHeight + 200) * index;
                    break;
            }

            gsap.to(fixedLogo, {
                scrollTrigger: {
                    trigger: '.js-fixed-element',
                },
                y: logoPosition,
                duration: speed
            });
        }

        const goToSection = (index) => {
            if (index < 0 || index >= sections.length) return;

            scrollLogo(index);

            let scrollDirection = index > currentIndex ? 'down' : 'up';

            let fixedSocialAnim =
                gsap.to(fixedSocial, {
                    scrollTrigger: {
                        trigger: '.js-fixed-social',
                    },
                    y: (index * window.innerHeight),
                    duration: speed
                });

            console.log(isBannerReady);


            if (isBannerReady && !hasBannerPlayed && scrollDirection === 'down') {
                event.preventDefault();
                bannerSlideRight.play();
                fixedSocialAnim.pause();
            }

            if (!isBannerReady) {
                gsap.to(window, {
                    scrollTo: sections[index],
                    duration: speed,
                    onComplete: () => {
                        currentIndex = index;
                        currentPosition = Math.round(window.scrollY);

                        console.log(bannerPosition, currentPosition);

                        if (bannerPosition === currentPosition) {
                            isBannerReady = true;
                        } else {
                            isBannerReady = false;
                        }
                    }
                })
            }

            if (isBannerReady && hasBannerPlayed && scrollDirection === 'up') {
                event.preventDefault();
                bannerSlideRight.reverse();
                fixedSocialAnim.pause();
            }
        }

        window.addEventListener("wheel", (event) => {

            if (event.deltaY > 0) {
                goToSection(currentIndex + 1);
            } else {
                goToSection(currentIndex - 1);
            }
        }, { passive: false });

        fixedLogo.addEventListener('click', () => {
            goToSection(0);
        });
    }

});