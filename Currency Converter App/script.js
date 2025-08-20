// ===============================
// Currency Converter App Scripts
// ===============================

// SECTION: Translation Dictionary & UI Translation
// Dictionary for UI translations and translation logic for all pages
const translations = {
    en: {
        'Home': 'Home',
        'About': 'About',
        'Login / Sign Up': 'Login / Sign Up',
        'Settings': 'Settings',
        'Currency Converter Tool': 'Currency Converter Tool',
        'Amount to Convert': 'Amount to Convert',
        'Convert From Currency': 'Convert From Currency',
        'Convert To Currency': 'Convert To Currency',
        'Convert': 'Convert',
        'Dark Mode': 'Dark Mode',
        'Light Mode': 'Light Mode',
        'Find Best & Closest ATMs': 'Find Best & Closest ATMs',
        'About the Currency Converter App': 'About the Currency Converter App',
        'This Currency Converter app allows you to convert between major world currencies and find the closest ATMs in any country. It features a modern, responsive design and easy-to-use interface. Sign up to save your preferences and enjoy a personalized experience!': 'This Currency Converter app allows you to convert between major world currencies and find the closest ATMs in any country. It features a modern, responsive design and easy-to-use interface. Sign up to save your preferences and enjoy a personalized experience!',
        'Live currency conversion using Frankfurter API': 'Live currency conversion using Frankfurter API',
        'ATM locator with Google Maps integration': 'ATM locator with Google Maps integration',
        'Simple signup/login for personalized features': 'Simple signup/login for personalized features',
        'Built with Bootstrap for a clean, professional look': 'Built with Bootstrap for a clean, professional look',
        'Login': 'Login',
        'Login to Currency Converter': 'Login to Currency Converter',
        'Email address': 'Email address',
        'Password': 'Password',
        'Sign Up or Login to Currency Converter': 'Sign Up or Login to Currency Converter',
        'Sign Up': 'Sign Up',
        'Change account': 'Change account',
    },
    ceb: {
        'Home': 'Balay',
        'About': 'Mahitungod',
        'Login / Sign Up': 'Login / Pagparehistro',
        'Settings': 'Mga Setting',
        'Currency Converter Tool': 'Himanan sa Pagbalhin sa Salapi',
        'Amount to Convert': 'Kantidad nga Ibalhin',
        'Convert From Currency': 'Gikan nga Salapi',
        'Convert To Currency': 'Padulong nga Salapi',
        'Convert': 'Ibalhin',
        'Dark Mode': 'Dark Mode',
        'Light Mode': 'Hayag nga Mode',
        'Find Best & Closest ATMs': 'Pangitaa ang Pinakamaayo ug Duol nga ATM',
        'About the Currency Converter App': 'Mahitungod sa Currency Converter App',
        'This Currency Converter app allows you to convert between major world currencies and find the closest ATMs in any country. It features a modern, responsive design and easy-to-use interface. Sign up to save your preferences and enjoy a personalized experience!': 'Kini nga Currency Converter app nagtugot kanimo sa pagbalhin sa dagkong salapi ug pagpangita sa pinakaduol nga ATM sa bisan unsang nasud. Moderno, responsive, ug sayon gamiton. Pagparehistro aron masave ang imong mga paborito ug malingaw sa personalized nga kasinatian!',
        'Live currency conversion using Frankfurter API': 'Live nga pagbalhin sa salapi gamit ang Frankfurter API',
        'ATM locator with Google Maps integration': 'ATM locator nga adunay Google Maps',
        'Simple signup/login for personalized features': 'Yano nga pagparehistro/login para sa personalized nga mga feature',
        'Built with Bootstrap for a clean, professional look': 'Gibuhat gamit ang Bootstrap para limpyo ug propesyonal nga hitsura',
        'Login': 'Pag-login',
        'Login to Currency Converter': 'Pag-login sa Currency Converter',
        'Email address': 'Email address',
        'Password': 'Password',
        'Sign Up or Login to Currency Converter': 'Pagparehistro o Pag-login sa Currency Converter',
        'Sign Up': 'Pagparehistro',
        'Change account': 'Usba ang account',
    }
};
function translateUI(lang) {
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (dict[key]) el.textContent = dict[key];
    });
    if (document.getElementById('darkModeToggle')) {
        document.getElementById('darkModeToggle').textContent = dict[document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode'];
    }
}
document.addEventListener('DOMContentLoaded', function() {
    let lang = 'en';
    const username = localStorage.getItem('username');
    if (username) {
        let profile = JSON.parse(localStorage.getItem(`profile_${username}`) || '{}');
        if (profile.language) lang = profile.language;
    }
    translateUI(lang);
});

// SECTION: Profile & Preferences
// Handles user profile, preferences, and localStorage

// ...existing code...

// SECTION: UI Initialization
// Sets up dark mode, loads preferences, and applies profile settings

// ...existing code...

// SECTION: Currency Conversion
// Handles conversion form, API calls, and result display

// ...existing code...

// SECTION: ATM Finder
// Handles Google Maps ATM search and city/country logic

// ...existing code...

// SECTION: Currency Dropdown Search
// Handles currency dropdown search and filtering

// ...existing code...

// SECTION: Navbar & Authentication
// Handles navbar login status and authentication display

// ...existing code...
// Currency conversion and ATM finder logic with free APIs

document.addEventListener('DOMContentLoaded', function () {
    // Load username and profile after DOMContentLoaded
    const username = localStorage.getItem('username');
    let profile = username ? JSON.parse(localStorage.getItem(`profile_${username}`) || '{}') : {};
    // Apply dark mode and preferences from profile
    if (username) {
        // Always apply color blind mode first
        document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
        if (profile.colorBlindMode === 'protanopia') {
            document.body.classList.add('protanopia');
        } else if (profile.colorBlindMode === 'deuteranopia') {
            document.body.classList.add('deuteranopia');
        } else if (profile.colorBlindMode === 'tritanopia') {
            document.body.classList.add('tritanopia');
        }
        // Dark mode (works with color blind mode)
        if (profile.darkMode) {
            document.body.classList.add('dark-mode');
            document.querySelectorAll('.navbar').forEach(el => el.classList.add('dark-mode'));
            document.querySelectorAll('.card').forEach(el => el.classList.add('dark-mode'));
            document.querySelectorAll('.form-control').forEach(el => el.classList.add('dark-mode'));
            document.querySelectorAll('.btn-outline-light').forEach(el => el.classList.add('dark-mode'));
            if (document.getElementById('darkModeToggle')) document.getElementById('darkModeToggle').textContent = 'Light Mode';
        }
        // Default city/country for ATM search
        window.defaultCity = profile.defaultCity || '';
        window.defaultCountry = profile.defaultCountry || '';
    }
    const form = document.getElementById('converter-form');
    const resultDiv = document.getElementById('result');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    // Load profile preferences for default currencies
    if (username) {
        if (profile.defaultFrom) fromCurrency.value = profile.defaultFrom;
        if (profile.defaultTo) toCurrency.value = profile.defaultTo;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        resultDiv.innerHTML = 'Converting...';
        // Update profile preferences to match conversion
        const username = localStorage.getItem('username');
        if (username) {
            let profile = JSON.parse(localStorage.getItem(`profile_${username}`) || '{}');
            profile.defaultFrom = from;
            profile.defaultTo = to;
            localStorage.setItem(`profile_${username}`, JSON.stringify(profile));
        }

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
            saveConversionToProfile(from, to, amount, converted);
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
                        searchDiv.className = 'mt-3';
                        searchDiv.id = 'city-search';
                        searchDiv.innerHTML = `
                                <div class="mb-2">
                                    <input type="text" class="form-control" placeholder="Enter city" id="city-input" aria-label="City name" value="${window.defaultCity || ''}">
                                </div>
                                <div class="mb-2">
                                    <input type="text" class="form-control" placeholder="Enter country (optional)" id="country-input" aria-label="Country name" value="${window.defaultCountry || ''}">
                                </div>
                                <button class="btn btn-primary btn-lg fw-bold w-100" id="search-city-btn" style="border-radius:0.5rem;" aria-label="Search for ATMs">🔍 Search</button>
                        `;
                        resultDiv.appendChild(searchDiv);
                        document.getElementById('search-city-btn').onclick = function () {
                                const city = document.getElementById('city-input').value.trim() || (window.defaultCity || 'Capital');
                                const countryInput = document.getElementById('country-input').value.trim();
                                const country = countryInput || window.defaultCountry || getCountryFromCurrency(document.getElementById('to-currency').value);
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
        // Try city + country, fallback to city only, then country only
        let location = `${city} ${country}`;
        let iframeSrc = `https://www.google.com/maps/embed/v1/search?key=AIzaSyD3bKpKnfK8--PLxnUt3wAxeOQL6yQOnM4&q=ATM+near+${encodeURIComponent(location)}`;
        mapDiv.innerHTML = `<iframe width="100%" height="400" style="border:0" loading="lazy" allowfullscreen src="${iframeSrc}"></iframe>`;
        saveATMSearchToProfile(city, country);
        // Optionally, try fallback if city+country fails (not possible to detect directly, but could add a button for fallback)
    }

    // Helper function to map currency code to country name
    function getCountryFromCurrency(currency) {
        const currencyCountryMap = {
            USD: 'Washington United States',
            EUR: 'Berlin Germany',
            GBP: 'London United Kingdom',
            JPY: 'Tokyo Japan',
            AUD: 'Sydney Australia',
            CAD: 'Toronto Canada',
            CHF: 'Zurich Switzerland',
            CNY: 'Beijing China',
            SGD: 'Singapore',
            INR: 'Delhi India',
            KRW: 'Seoul South Korea',
            PHP: 'Manila Philippines',
            NZD: 'Auckland New Zealand',
            MXN: 'Mexico City Mexico',
            ZAR: 'Johannesburg South Africa',
            BRL: 'Rio de Janeiro Brazil',
            TRY: 'Istanbul Turkey',
            SEK: 'Stockholm Sweden',
            NOK: 'Oslo Norway',
            DKK: 'Copenhagen Denmark',
            PLN: 'Warsaw Poland',
            THB: 'Bangkok Thailand',
            IDR: 'Jakarta Indonesia',
            MYR: 'Kuala Lumpur Malaysia',
            CZK: 'Prague Czech Republic',
            HUF: 'Budapest Hungary',
            ILS: 'Tel Aviv Israel',
            SAR: 'Riyadh Saudi Arabia',
            AED: 'Dubai United Arab Emirates',
            COP: 'Bogota Colombia',
            EGP: 'Cairo Egypt',
            PKR: 'Islamabad Pakistan',
            VND: 'Hanoi Vietnam',
            CLP: 'Santiago Chile',
            TWD: 'Taipei Taiwan',
            UAH: 'Kyiv Ukraine',
            RON: 'Bucharest Romania',
            BGN: 'Sofia Bulgaria',
            HRK: 'Zagreb Croatia',
            ISK: 'Reykjavik Iceland',
            JMD: 'Kingston Jamaica',
            KZT: 'Almaty Kazakhstan',
            LKR: 'Colombo Sri Lanka',
            MAD: 'Casablanca Morocco',
            NGN: 'Lagos Nigeria',
            PEN: 'Lima Peru',
            QAR: 'Doha Qatar',
            RSD: 'Belgrade Serbia',
            SYP: 'Damascus Syria',
            TND: 'Tunis Tunisia',
            TZS: 'Dar es Salaam Tanzania',
            UGX: 'Kampala Uganda',
            UYU: 'Montevideo Uruguay',
            VEF: 'Caracas Venezuela',
            XOF: 'Abidjan Ivory Coast',
            ZMW: 'Lusaka Zambia'
        };
        return currencyCountryMap[currency] || currency;
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

    // User profile management in localStorage
    function getCurrentUsername() {
        return localStorage.getItem('username');
    }
    function getUserProfile(username) {
    const profileStr = localStorage.getItem(`profile_${username}`);
    let profile = profileStr ? JSON.parse(profileStr) : {};
    // Ensure all required fields exist
    if (!Array.isArray(profile.conversions)) profile.conversions = [];
    if (!Array.isArray(profile.favorites)) profile.favorites = [];
    if (!Array.isArray(profile.atmSearches)) profile.atmSearches = [];
    if (typeof profile.defaultFrom !== 'string') profile.defaultFrom = 'USD';
    if (typeof profile.defaultTo !== 'string') profile.defaultTo = 'EUR';
    if (typeof profile.defaultCountry !== 'string') profile.defaultCountry = '';
    if (typeof profile.defaultCity !== 'string') profile.defaultCity = '';
    if (typeof profile.darkMode !== 'boolean') profile.darkMode = false;
    if (typeof profile.colorBlindMode !== 'string') profile.colorBlindMode = 'none';
    if (typeof profile.language !== 'string') profile.language = 'en';
    if (typeof profile.fontSize !== 'string') profile.fontSize = 'normal';
    if (typeof profile.highContrast !== 'boolean') profile.highContrast = false;
    return profile;
    }
    function saveUserProfile(username, profile) {
        localStorage.setItem(`profile_${username}`, JSON.stringify(profile));
    }
    // Save conversion to user profile
    function saveConversionToProfile(from, to, amount, result) {
        const username = getCurrentUsername();
        if (!username) return;
        const profile = getUserProfile(username);
        profile.conversions.push({from, to, amount, result, date: Date.now()});
        saveUserProfile(username, profile);
    }
    // Save ATM search to user profile
    function saveATMSearchToProfile(city, country) {
        const username = getCurrentUsername();
        if (!username) return;
        const profile = getUserProfile(username);
        profile.atmSearches.push({city, country, date: Date.now()});
        saveUserProfile(username, profile);
    }
});