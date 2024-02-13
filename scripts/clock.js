// Retrieve query parameters
const params = new URLSearchParams(window.location.search);

// Get the value of each parameter
const players = params.get('players');
const time = params.get('time');
const timeType = params.get('timeType');


// Get the Location of Useful Divs
const clockPage = document.getElementById('clockBody');
const pauseBtn = document.getElementById('pauseContainer');

let activeNum = 0; // Number to see which player is active (0 if paused)


// Gets whatever time format sent through into seconds for computer's benefit

let timeFixed = 0;
if (timeType === "SECONDS"){
    timeFixed = time;
}
else if(timeType === "MINUTES"){
    timeFixed = time * 60;
}
else{
    timeFixed = time * 3600;
}


// Outputs fresh HTML to the webpage to display correct data

function updateAll(){

    // Clock Update Logic
    let writeData = "";

    for (let i = 1; i <= players; i++){
        let objClass = "playerClock";
        if (i == activeNum){
            objClass = "playerClockActive";
        }
        let newData = `<div class="${objClass}"><h2>Player ${i}</h2><p>${timeFixed}</p><p>Press ${i} to Switch To</p></div>`;
        writeData += newData;
    }

    clockPage.innerHTML = writeData;

    // Pause Button Update Logic
    let pauseClass = "pauseBtn";
    if(activeNum == 0){
        pauseClass = "pauseBtnActive";
    }
    pauseBtn.innerHTML = `<div class="${pauseClass}"><h2>Pause Game</h2><p>Press P or 0 to Pause Clocks</p></div>`;
}


// Handles the pressing of any keys as to switch between active players
function logPress(event){
    if (event.keyCode == 80) {
        // Execute your desired function or code here
        if(activeNum != 0){
            activeNum = 0;
            updateAll();
        }
    }
    else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        // Retrieve the value entered by the user
        const inputValue = event.key;
        if ((inputValue <= players) && (inputValue != activeNum)){
            console.log("Event Key:", event.key);
            activeNum = inputValue;
            updateAll();
        }
        
    }
    if (event.code === 'Space' || event.key === ' ') {
        if ((activeNum < players) && (activeNum > 0)){
            activeNum++;
        }
        else{
            activeNum = 1;
        }
        updateAll();
    }
}


// handles the event listeners to make sure that the page has loaded first, essentially can be used like a Main Function
document.addEventListener("DOMContentLoaded", function() {
    // Startup Tasks for Initial Display
    updateAll()

    document.addEventListener('keydown', function(event) {
        logPress(event);
    });

});

/**
 * Layout for Timer Functionality - check
 * 
 * Array with times (might be objects with more data, or just times)
 * 
 * Way to choose active timer - check
 * 
 * Starts the interval engine, goes until something stops it
 * 
 * Saves decreased time into array, then switching to different one to then start decreasing
 * 
 * Accounts for a pause to also occur
 * 
 * Displays the times out to the div beyond
 */