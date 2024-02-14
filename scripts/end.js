// Retrieve query parameters
const params = new URLSearchParams(window.location.search);

// Extract time up player
const playerNum = params.get('player');

document.addEventListener("DOMContentLoaded", function() {
    const outPutDiv = document.getElementById('endMessage');
    outPutDiv.innerHTML = `<h2>Player ${playerNum} Ran Out of Time</h2>`;
});