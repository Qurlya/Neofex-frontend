const API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
const CURRENCIES = ['USD', 'EUR', 'CAD', 'CNY', 'CHF', 'SGD'];
const UPDATE_INTERVAL_MS = 15 * 60 * 1000;

async function fetchExchangeRates(currencies) {
    try {
        const response = await axios.get(API_URL);
        const valutes = response.data.Valute;

        return currencies.map((code) => {
            const item = valutes[code];
            const rate = item ? item.Value / item.Nominal : null;
            return { code, rate };
        });
    } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
        return currencies.map((code) => ({ code, rate: null }));
    }
}

function renderRates(rates) {
    const listEl = document.getElementById('ratesList');

    listEl.innerHTML = rates.map(({ code, rate }) => `
            <div class="rates__item">
                <dt class="rates__code">${code}:</dt>
                <dd class="rates__value">${rate !== null ? rate.toFixed(2) : '—'}</dd>
            </div>`).join('');
}

function updateTimestamp() {
    const updatedEl = document.getElementById('ratesUpdated');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ru-RU', {
        timeZone: 'Europe/Moscow',
    });

    updatedEl.textContent = `Update every 15 minutes, MSC ${formattedDate}`;
}

async function initRatesWidget() {
    const rates = await fetchExchangeRates(CURRENCIES);
    renderRates(rates);
    updateTimestamp();

    setInterval(async () => {
        const freshRates = await fetchExchangeRates(CURRENCIES);
        renderRates(freshRates);
        updateTimestamp();
    }, UPDATE_INTERVAL_MS);
}

initRatesWidget();