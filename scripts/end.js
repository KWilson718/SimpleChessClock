// Retrieve query parameters
const params = new URLSearchParams(window.location.search);

// Extract time up player
const playerNum = params.get('player');
const paramArray = params.get('array');
const timesArray = paramArray.split(',').map(Number);
let arrayMessage = "<h3>Final Times Per Player:</h3><br>";

for (let i = 0; i < timesArray.length; i++){

    let hours = String(Math.floor(timesArray[i] / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((timesArray[i] % 3600) / 60)).padStart(2, '0');
    let seconds = String(timesArray[i] % 60).padStart(2, '0');

    arrayMessage += `<p>Player ${i + 1}: ${hours}:${minutes}:${seconds}</p>`;
}

document.addEventListener("DOMContentLoaded", function() {
    const outPutDiv = document.getElementById('endMessage');
    outPutDiv.innerHTML = `<h2>Player ${playerNum} Ran Out of Time</h2><br><br>${arrayMessage}`;
});