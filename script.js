document.addEventListener('DOMContentLoaded', function () {
    async function fetchCurrencies() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            return Object.keys(data.rates); 
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    }

    async function populateSelects() {
        const currencyCodes = await fetchCurrencies();
        const selects = document.querySelectorAll('.selects select');

        currencyCodes.forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = code;
            selects.forEach(select => {
                select.appendChild(option.cloneNode(true));
            });
        });
    }

    populateSelects();

    document.getElementById('convertBtn').addEventListener('click', async function () {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            const rate = data.rates[toCurrency];
            const result = amount * rate;
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        } catch (error) {
            console.error('Error converting currencies:', error);
        }
    });
});
