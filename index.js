// Global variable to store the currently selected curreny
let currentCurrency = "USD";
let currentGoldCurrency = "USD";

async function fetchBitcoinPrice() {
    // Contruct the API URL with the current currency
    const apiURL = `https://api.coinbase.com/v2/prices/BTC-${currentCurrency}/spot`;

    try {
        // Fetch data from the API
        let response = await fetch(apiURL);
        // Parse the JSON response
        let json = await response.json();
        // Extract the Bitcoin price from the response
        const bitcoinPrice = json.data.amount;

        // Update the price display on the webpage
        document.getElementById("price").textContent= `${currentCurrency} $${bitcoinPrice}`;
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error("Error fetching Bitcoin Price",error);
    }
}

async function fetchGoldPrice() {
    const apiURL = `https://api.metals-api.com/v1/latest?access_key=YOUR_API_KEY&base=${currentGoldCurrency}&symbols=XAU`;

    try {
        let response = await fetch(apiURL);
        let json = await response.json();
        const goldPrice = json.rates.XAU;
        document.getElementById("gold-price").textContent = `${currentGoldCurrency} ${goldPrice}`;
    } catch (error) {
        console.error("Error fetching Gold Price", error);
    }
}

function togglePriceVisability(){
    // Get the element that diplays price
    const priceElement = document.getElementById("price");
    // Toggle between hiding and showing the price
    if (priceElement.style.display === "none") {
        priceElement.style.display = "inline";
    } else {
        priceElement.style.display = "none";
    }
}


function updateDateTime() {
    //GEt the element where the date/time will be displayed
    const dateTimeElement = document.getElementById("datetime");
    // Get current date and time as a localized string
    const currentDateTime = new Date().toLocaleString();
    // Update the date/time display
    dateTimeElement.textContent = currentDateTime;

}


// Wait for the DOM to be fully loaded before setting up event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the relevant DOM elements
    const currencySelector = document.getElementById("currenty-selector");
    const toggleButton = document.getElementById("toggle-button");
    const refreshButton = document.getElementById("refresh-button");

    const goldCurrencySelector = document.getElementById("gold-currency-selector");
    const goldToggleButton = document.getElementById("gold-toggle-button");
    const goldRefreshButton = document.getElementById("gold-refresh-button");

    // Set up event listener for currency selection changes
    currencySelector.addEventListener("change", function () {
        // Update the current currency when the selection changes
        currentCurrency = this.value;
        // Fetch and display the price for the new currency
        fetchBitcoinPrice();
    });

    // Set up event listener for the toggle visability button 
    toggleButton.addEventListener("click", togglePriceVisability);

    // Set up event listener for the refresh button
    refreshButton.addEventListener("click", fetchBitcoinPrice);



    
    setInterval(fetchBitcoinPrice, 3000); //Update Price every 3 seconds
    setInterval(updateDateTime, 1000);      // Update date/time every second

    //Initiate calls to display date immediately
    fetchBitcoinPrice();
    updateDateTime();
});

    goldCurrencySelector.addEventListener("change", function () {
        currentGoldCurrency = this.value;
        fetchGoldPrice();
});

    goldToggleButton.addEventListener("click", function() {
        togglePriceVisibility("gold-price");
});

    setInterval(fetchGoldPrice, 3000); //Update Price every 3 seconds
    setInterval(updateDateTime, 1000);      // Update date/time every second

    //Initiate calls to display date immediately
    fetchGoldPrice();
    updateDateTime();
    