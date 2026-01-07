const styleObj = getComputedStyle(document.documentElement),
    desktopMedia = styleObj.getPropertyValue('--desktop');

const loadClass = 'is-animation-load';

let speed = styleObj.getPropertyValue('--speed-large');
speed = parseFloat(speed) / 1000;

window.addEventListener('load', () => {

    if (window.innerWidth >= desktopMedia) {
        const animatedBody = document.querySelector('body');

        animatedBody?.classList.add(loadClass);

		const isSlideTopScrollTriggerObj = {
			start: "top bottom",
			toggleActions: "play none none none"
		}

		const animateCreate = (el, objProperty, objScrollTrigger = isSlideTopScrollTriggerObj, delay = 0) => {
            document.querySelectorAll(el).forEach((el, i) => {

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

        animateCreate(`.${loadClass} .is-slide-top`, {
			y: 0,
			opacity: 1,
			duration: speed,
			ease: "power3.inOut"
		});

        animateCreate(`.${loadClass} .is-zoom`, {
            scale: 1,
            duration: speed,
            ease: "power2.inOut",
        });

        gsap.to(`.${loadClass} .is-slide-left`, {
            x: 0,
            opacity: 1,
            duration: speed * 1.1,
            ease: "power3.inOut"
        })

		const imagesSlideTopBounce = {
			y: 0,
			duration: speed,
			ease: "back.out",
		}

		const imagesSlideTop = {
			y: 0,
			duration: speed,
			ease: "power3.out"
		}

        const heroAnimTl = gsap.timeline();

        heroAnimTl
            .to(`.${loadClass} .is-hero-decor-animation-bounce`, {
				...imagesSlideTopBounce,
				delay: 0.5,
				stagger: {
					each: 0.3,
				}
            })
            .to(`.${loadClass} .is-hero-decor-animation-delay`, {
				...imagesSlideTop
            }, "1");

		animateCreate(`.${loadClass} .is-about-decor-animation-bounce`, imagesSlideTopBounce,
			{
				start: "top 120%",
				toggleActions: "play none none none"
			}, speed / 3
		);

		animateCreate(`.${loadClass} .is-about-decor-animation`, imagesSlideTop, isSlideTopScrollTriggerObj, speed)


		const bannerSlideRight = gsap.timeline();
        let wheelEnable = true;
		let hasBannerPlayed = false;

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
					wheelEnable = true;
                    hasBannerPlayed = true;
                    currentIndex += 1;
                },
                onReverseComplete: () => {
					wheelEnable = true;
                    hasBannerPlayed = false;
                    currentIndex -= 1;
                }
            })

        bannerSlideRight.pause();

        const sections = document.querySelectorAll('.js-sections');
        const fixedLogo = document.querySelector(`.${loadClass}`).querySelector('.js-fixed-element');
        const fixedSocial = document.querySelector(`.${loadClass}`).querySelector('.js-fixed-social');
        const bannerIndex = [...sections].indexOf(document.querySelector('.section-decor'));

        let currentIndex = 0,
            logoPosition = 0,
			toolbarIndex = currentIndex;

        const scrollLogo = (index, mod = 0) => {

			logoPosition = ((window.innerHeight + 200) * index) + 200 * mod;

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
			wheelEnable = false;

            let scrollDirection = index > currentIndex ? 'down' : 'up';

            let scrollIndex = index;

            if (bannerIndex === index && !hasBannerPlayed) {
                bannerSlideRight.play();
                return;
            }

            if ((bannerIndex - 1) === index && hasBannerPlayed) {
                bannerSlideRight.reverse();
                return;
            }

			if (scrollDirection === 'down') {
				toolbarIndex += 1;
			} else {
				toolbarIndex -= 1;
			}

            if(bannerIndex === index && scrollDirection === 'up') {
                scrollIndex = index - 1;
				toolbarIndex = scrollIndex;
            }

			gsap.to(fixedSocial, {
				scrollTrigger: {
					trigger: '.js-fixed-social',
				},
				y: (toolbarIndex * window.innerHeight),
				duration: speed
			});

			let mod = 0;

			if (sections[index] === document.querySelector('.section-icon')) {
				mod = 1;
			}

			scrollLogo(toolbarIndex, mod);
            gsap.to(window, {
                scrollTo: sections[scrollIndex],
                duration: speed,
                onComplete: () => {
                    currentIndex = index;
					wheelEnable = true;
                }
            });
        }

        window.addEventListener("wheel", (event) => {
            event.preventDefault();

			if (wheelEnable !== false) {
				if (event.deltaY > 0) {
					goToSection(currentIndex + 1);
				} else {
					goToSection(currentIndex - 1);
				}
			}
        }, { passive: false });

        fixedLogo.addEventListener('click', () => {
            goToSection(0);
        });
    }

});