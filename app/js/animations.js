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

        const animateCreate = (el, objProperty, objScrollTrigger) => {
            document.querySelectorAll(el).forEach(el => {
                i = i + 1;

                gsap.to(el, {
                    ...objProperty,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: el,
                        ...objScrollTrigger
                    }
                });
            })
        }

        animateCreate(`.${loadClass} .is-slide-top`, {
            y: 0,
            opacity: 1,
            duration: speed,
            ease: "power3.inOut",
            delay: 0
        }, {
            start: "top bottom",
            toggleActions: "play none none none"
        });

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

        const bannerSlideRight = gsap.timeline({
            scrollTrigger: {
                trigger: `.${loadClass} .is-slide-right`,
                start: "top top",
                toggleActions: "play reverse play reverse"
            }
        });

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
            ease: "power2.out"
        })

        bannerSlideRight.paused();

        const sections = document.querySelectorAll('.js-sections');
        const fixedLogo = document.querySelector(`.${loadClass}`).querySelector('.js-fixed-element');

        let currentIndex = 0,
            logoPosition = 0;

        const scrollLogo = (index) => {
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
                    trigger: '.js-fixed-element',
                },
                y: logoPosition,
                duration: speed
            });
        }

        const goToSection = (index) => {
            if (index < 0 || index >= sections.length) return;

            scrollLogo(index);

            gsap.to(window, {
                scrollTo: sections[index],
                duration: speed,
                onComplete: () => {
                    currentIndex = index;
                }
            })
        }

        window.addEventListener("wheel", (event) => {
            if (event.deltaY > 0) {
                goToSection(currentIndex + 1);
            } else {
                goToSection(currentIndex - 1);
            }
        });

        fixedLogo.addEventListener('click', () => {
            goToSection(0);
        });
    }

});