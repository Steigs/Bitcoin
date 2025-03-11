// Global variable to store the currently selected curreny
let currentCurrency = "USD";

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
    setInterval(fetchBitcoinPrice, 3000); //Update Price every 3 seconds
    setInterval(updateDateTime, 1000);      // Update date/time every second

    //Initiate calls to display date immediately
    fetchBitcoinPrice();
    updateDateTime();
});