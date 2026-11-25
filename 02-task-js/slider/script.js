async function fetchData(url, params = {}) {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        return [];
    }
}

function renderCards(items) {
    const feed = document.querySelector('.slider__feed');

    feed.innerHTML = items.map((item) => `
      <article class="slider__card">
        <img class="slider__image" src="${item.url}" alt="${item.title}" loading="lazy">
        <h2 class="slider__title">${item.title}</h2>
        <p class="slider__description">Photo №${item.id}</p>
      </article>
    `).join('');
}

async function init() {
    const photos = await fetchData('https://jsonplaceholder.typicode.com/photos', {
        _limit: 10,
    });
    if (!photos.length) return;
    renderCards(photos);
    setupSlider()
}

function setupSlider(){
    const feed = document.querySelector('.slider__feed');
    const prevBtn = document.querySelector('.slider__btn--prev');
    const nextBtn = document.querySelector('.slider__btn--next');

    function updateButtons(){
        prevBtn.disabled = feed.scrollLeft <= 0;
        nextBtn.disabled = feed.scrollLeft + feed.clientWidth >= feed.scrollWidth - 1;
    }
    function getScrollStep(){
        return Math.min(500, feed.clientWidth * 0.8);
    }

    prevBtn.addEventListener('click', () => {
        feed.scrollBy({ left: -getScrollStep(), behavior: 'smooth' })
    })
    nextBtn.addEventListener('click', () => {
        feed.scrollBy({ left: getScrollStep(), behavior: 'smooth' })
    })
    feed.addEventListener('scroll', updateButtons)
    window.addEventListener('resize', updateButtons);
    updateButtons()
}

init();