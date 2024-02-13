// Retrieve query parameters
const params = new URLSearchParams(window.location.search);

// Get the value of each parameter
const players = params.get('players');
const time = params.get('time');
const timeType = params.get('timeType');

let timeFixed = 0; // a fixed time that is going to be guaranteed to be in seconds (for setting clocks)

let activeNum = 0; // Number to see which player is active (0 if paused)

// Log the values to the console to ensure it's working
console.log('Number of Players:', players);
console.log('Time Per Player:', time);
console.log('Time Type:', timeType);

if (timeType === "SECONDS"){
    timeFixed = time;
}
else if(timeType === "MINUTES"){
    timeFixed = time * 60;
}
else{
    timeFixed = time * 3600;
}

console.log('Time Fixed:', timeFixed);



// Logic for Player Clock Divs
function updateClocks(item){
    
    let writeData = "";

    for (let i = 1; i <= players; i++){
        let objClass = "playerClock";
        if (i === activeNum){
            objClass = "playerClockActive";
        }
        let newData = `<div class="${objClass}"><h2>Player ${i}</h2><p>${timeFixed}</p><p>Press ${i} to Switch To</p></div>`;
        writeData += newData;
    }

    item.innerHTML = writeData;
}

// Logic for Pause Button Div
function updatePauseBTN(item){

    let pauseClass = "pauseBtn";
    if(activeNum === 0){
        pauseClass = "pauseBtnActive";
    }
    item.innerHTML = `<div class="${pauseClass}"><h2>Pause Game</h2><p>Press P to Pause Clocks</p></div>`;

}

function updateAll (item1, item2){
    updateClocks(item1);
    updatePauseBTN(item2);
}

document.addEventListener("DOMContentLoaded", function() {
    const clockPage = document.getElementById('clockBody');
    const pauseBtn = document.getElementById('pauseContainer');

    updateAll (clockPage, pauseBtn);

});

/**
 * Layout for Timer Functionality - check
 * 
 * Array with times (might be objects with more data, or just times)
 * 
 * Way to choose active timer
 * 
 * Starts the interval engine, goes until something stops it
 * 
 * Saves decreased time into array, then switching to different one to then start decreasing
 * 
 * Accounts for a pause to also occur
 * 
 * Displays the times out to the div beyond
 */