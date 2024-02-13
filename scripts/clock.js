// Retrieve query parameters
const params = new URLSearchParams(window.location.search);

// Get the value of each parameter
const players = params.get('players');
const time = params.get('time');
const timeType = params.get('timeType');

// Log the values to the console to ensure it's working
console.log('Number of Players:', players);
console.log('Time Per Player:', time);
console.log('Time Type:', timeType);

