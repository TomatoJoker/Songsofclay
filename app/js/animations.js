const styleObj = getComputedStyle(document.documentElement);
const desktopMedia = styleObj.getPropertyValue('--desktop');
let speed = styleObj.getPropertyValue('--speed-large');
speed = parseFloat(speed) / 1000;


window.addEventListener('load', () => {
    if (window.innerWidth >= desktopMedia) {
        const animatedBody = document.querySelector('body');
        animatedBody?.classList.add('is-animation-load');

        gsap.to(".is-animation-load .is-slide-top", {
            y: 0,
            opacity: 1,
            duration: speed,
            ease: "power3.inOut",
        })

        gsap.to(".is-animation-load .is-zoom", {
            scale: 1,
            duration: speed,
            ease: "power2.inOut"
        })

        gsap.to(".is-animation-load .is-slide-left", {
            x: 0,
            opacity: 1,
            duration: speed * 1.1,
            ease: "power3.inOut"
        })

        const heroAnimTl = gsap.timeline();

        heroAnimTl
            .to(".is-animation-load .is-hero-decor-animation-bounce", {
                y: 0,
                duration: speed,
                ease: "back.out",
                delay: 0.5,
                stagger: {
                    each: 0.3,
                }
            })
            .to(".is-animation-load .is-hero-decor-animation-delay", {
                y: 0,
                duration: speed,
                ease: "power3.out"
            }, "1")
    }

});