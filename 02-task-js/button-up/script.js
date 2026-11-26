const buttonUp = document.getElementById('buttonUp');
const SCROLL_THRESHOLD = 300;

function toggleButtonVisibility() {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;
    buttonUp.classList.toggle('button-up--visible', isScrolled);
}

window.addEventListener('scroll', toggleButtonVisibility, { passive: true });

buttonUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

toggleButtonVisibility();