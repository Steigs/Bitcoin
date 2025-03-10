function updateDateTime() {
    //GEt the element where the date/time will be displayed
    const dateTimeElement = document.getElementById("datetime");
    // Get current date and time as a localized string
    const currentDateTime = new Date().toLocalsString();
    // Update the date/time display
    dateTimeElement.textContent = currentDateTime;

}

// Wait for the DOM to be fully loaded before setting up event listeners
document.addEventListener("DOMContentLoaded", function() {
    setInterval(updateDateTime, 1000);      // Update date/time every second

    //Initiate calls to display date immediately
    updateDateTime();
});