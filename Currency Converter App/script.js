// Currency conversion and ATM finder logic with free APIs

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('converter-form');
    const resultDiv = document.getElementById('result');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        resultDiv.innerHTML = 'Converting...';

        // Use Frankfurter API for any currency conversion
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
            if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
            const data = await res.json();
            if (!data.rates || typeof data.rates[to] !== 'number') {
                resultDiv.innerHTML = 'API response:<br><pre>' + JSON.stringify(data, null, 2) + '</pre>';
                throw new Error(`${to} rate not found in API response`);
            }
            const converted = data.rates[to];
            resultDiv.innerHTML = `<strong>${amount} ${from}</strong> = <strong>${converted.toFixed(2)} ${to}</strong>`;
            showATMButton(converted);
        } catch (err) {
            resultDiv.innerHTML += '<br>Error converting currency. ' + err.message;
        }
    });

    function showATMButton(convertedAmount) {
        if (!document.getElementById('atm-btn')) {
            const atmBtn = document.createElement('button');
            atmBtn.id = 'atm-btn';
            atmBtn.className = 'btn btn-success w-100 mt-3';
            atmBtn.textContent = 'Find Best & Closest ATMs';
            atmBtn.onclick = function () {
                atmBtn.remove(); // Remove button after click
                showCitySearchBar();
                // Use selected currency as country code
                const country = getCountryFromCurrency(document.getElementById('to-currency').value);
                findATMs(country, country); // Default to country name for both city and country
            };
            resultDiv.appendChild(atmBtn);
        }
    }

    function showCitySearchBar() {
        if (!document.getElementById('city-search')) {
            const searchDiv = document.createElement('div');
            searchDiv.className = 'input-group mt-3';
            searchDiv.id = 'city-search';
            searchDiv.innerHTML = `
                <input type="text" class="form-control" placeholder="Enter city" id="city-input">
                <button class="btn btn-primary" id="search-city-btn">Search</button>
            `;
            resultDiv.appendChild(searchDiv);
            document.getElementById('search-city-btn').onclick = function () {
                const city = document.getElementById('city-input').value.trim() || 'Capital';
                const country = getCountryFromCurrency(document.getElementById('to-currency').value);
                findATMs(city, country);
            };
        }
    }

    function findATMs(city, country) {
        let mapDiv = document.getElementById('map');
        if (!mapDiv) {
            mapDiv = document.createElement('div');
            mapDiv.id = 'map';
            mapDiv.style = 'width:100%;height:400px;margin-top:15px;';
            resultDiv.appendChild(mapDiv);
        }
        // Use only the country for the initial search if city is the same as country
        const location = city === country ? country : `${city} ${country}`;
        mapDiv.innerHTML = `<iframe width="100%" height="400" style="border:0" loading="lazy" allowfullscreen
            src="https://www.google.com/maps/embed/v1/search?key=AIzaSyD3bKpKnfK8--PLxnUt3wAxeOQL6yQOnM4&q=ATM+near+${encodeURIComponent(location)}">
        </iframe>`;
    }

    // Helper function to map currency code to country name
    function getCountryFromCurrency(currency) {
        const currencyCountryMap = {
            USD: 'United States',
            EUR: 'Germany',
            GBP: 'United Kingdom',
            JPY: 'Tokyo Japan',
            AUD: 'Australia',
            CAD: 'Canada',
            CHF: 'Switzerland',
            CNY: 'Beijing China',
            SGD: 'Singapore',
            INR: 'Delhi India',
            KRW: 'Seoul South Korea',
            PHP: 'Manila Philippines'
        };
        return currencyCountryMap[currency] || 'World';
    }

    // Currency search for dropdowns
    function filterCurrencyOptions(searchInputId, selectId) {
        const searchInput = document.getElementById(searchInputId);
        const select = document.getElementById(selectId);
        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            for (let i = 0; i < select.options.length; i++) {
                const option = select.options[i];
                const text = option.text.toLowerCase();
                option.style.display = text.includes(filter) ? '' : 'none';
            }
        });
    }
    filterCurrencyOptions('from-currency-search', 'from-currency');
    filterCurrencyOptions('to-currency-search', 'to-currency');

    // Show search bar only when dropdown is focused, and position it below the dropdown
    function setupCurrencySearchToggle(searchInputId, selectId) {
        const searchInput = document.getElementById(searchInputId);
        const select = document.getElementById(selectId);
        select.addEventListener('focus', function() {
            searchInput.classList.remove('d-none');
            searchInput.focus();
        });
        select.addEventListener('blur', function() {
            setTimeout(() => searchInput.classList.add('d-none'), 200);
        });
        searchInput.addEventListener('blur', function() {
            searchInput.classList.add('d-none');
        });
    }
    setupCurrencySearchToggle('from-currency-search', 'from-currency');
    setupCurrencySearchToggle('to-currency-search', 'to-currency');

    // Show logged in status if user is signed up
    const navbar = document.querySelector('.navbar-nav');
    if (localStorage.getItem('loggedIn') === 'true') {
        // Remove Login/Sign Up link if logged in
        const loginSignupLink = navbar.querySelector('a[href="signup.html"]');
        if (loginSignupLink) {
            loginSignupLink.parentElement.remove();
        }
        let loggedInItem = document.getElementById('logged-in-status');
        if (!loggedInItem) {
            loggedInItem = document.createElement('li');
            loggedInItem.className = 'nav-item';
            loggedInItem.id = 'logged-in-status';
            loggedInItem.innerHTML = `<span class="nav-link fw-bold bg-white text-dark px-3 py-2 rounded shadow-sm">Logged in as ${localStorage.getItem('username') || 'User'}</span>`;
            navbar.appendChild(loggedInItem);
        }
    }
});
