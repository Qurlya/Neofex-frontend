const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('.filter__item');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    items.forEach((item) => {
        const matches = item.textContent.toLowerCase().includes(query);
        item.classList.toggle('filter__item--hidden', !matches);
    });
});