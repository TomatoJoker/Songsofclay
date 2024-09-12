dynamicHeightToolbar()
window.addEventListener("resize", function () {
    dynamicHeightToolbar();
});

function toggleMenu() {
    const modal = document.querySelector('.js-burger-menu'),
        btnOpen = document.querySelector('.js-open-burger'),
        btnClose = document.querySelector('.js-close-burger');

    btnOpen.addEventListener('click', () => {
        modal.classList.add('is-open');
    })

    btnClose.addEventListener('click', () => {
        modal.classList.remove('is-open');
    })

};

toggleMenu();

function dynamicHeightToolbar() {
    if (window.innerWidth < 1200) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    } else {
        document.documentElement.style.removeProperty('--vh');
    }
} // calc window height without toolbar on mobile browser