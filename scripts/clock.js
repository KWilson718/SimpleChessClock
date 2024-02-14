// Retrieve query parameters
const params = new URLSearchParams(window.location.search);

// Get the value of each parameter
const players = params.get('players');
const startingHours = params.get('hours');
const startingMinutes = params.get('minutes');
const startingSeconds = params.get('seconds');

// Gets the Total Time in Seconds that was entered by the user
const startTime = (startingHours * 3600) + (startingMinutes * 60) + parseInt(startingSeconds);

// Get the Location of Useful Divs
const clockPage = document.getElementById('clockBody');
const pauseBtn = document.getElementById('pauseContainer');

let activeNum = 0; // Number to see which player is active (0 if paused)
let modifyMode = false;

let activeTimerNum = 0;


// Creates an Array of Times for each user to have one
let timesArray = Array(parseInt(players)).fill(startTime);
console.log("Array", timesArray);


function startTimer(){
    currPlayer = activeNum;
    activeTimerNum = setInterval(() => {
        if((timesArray[currPlayer - 1] > 0) && (currPlayer == activeNum)){
            timesArray[currPlayer - 1]--;
            if (timesArray[currPlayer - 1] > 0){
                updateAll(-1);
            }
            else{
                console.log("Player ", currPlayer, " ran out of time...");
                const params = new URLSearchParams({
                    player: currPlayer,
                    array: timesArray.join(',')
                });
                window.location.href = 'timeUp.html?' + params.toString();
                clearInterval(activeTimerNum);
            }
            
        }
        else if(timesArray[currPlayer - 1] <= 0){
            // Creates a Parameter with the Player Whose Time is Up and then switches to the time up page
            const params = new URLSearchParams({
                player: currPlayer,
                array: timesArray.join(',')
            });
            window.location.href = 'timeUp.html?' + params.toString();

            clearInterval(activeTimerNum);
        }
        else{
            clearInterval(activeTimerNum);
        }
    }, 1000);

}


// Outputs fresh HTML to the webpage to display correct data
function updateAll(updateType){ // -1 is do nothing, 0 is switch active player, 1 is enter time modification mode

    if (updateType == 1){
        modifyMode = true;
    }
    else{
        modifyMode = false;
    }

    // Clock Update Logic
    let writeData = "";

    if ((updateType == -1) || (updateType == 0)){
        for (let i = 1; i <= players; i++){
            let currTime = timesArray[i-1];
            let hours = String(Math.floor(currTime / 3600)).padStart(2, '0');
            let minutes = String(Math.floor((currTime % 3600) / 60)).padStart(2, '0');
            let seconds = String(currTime % 60).padStart(2, '0');
    
            let objClass = "playerClock";
            if (i == activeNum){
                objClass = "playerClockActive";
            }
            let newData = `<div class="${objClass}"><h2>Player ${i}</h2><p>Time Left: ${hours}:${minutes}:${seconds}</p><p>Press ${i} to Switch To</p></div>`;
            writeData += newData;
        }    
    }
    else if (updateType == 1){
        console.log("Modification Mode Entered");
        // Output a form to modify or add time to each time slot
        writeData += `<form id="timeForm">`;
        for (let i = 1; i <= players; i++) {
            writeData += `
                <label for="player${i}">Player ${i}:</label>
                <input type="number" id="player${i}" name="player${i}" value="${timesArray[i - 1]}"><br>
            `;
        }
        writeData += `<input type="submit" value="Submit"></form>`;
    }

    // Writes Logic Needed to Main Body Section
    clockPage.innerHTML = writeData;

    // Add event listener to the form
    if (updateType == 1){
        document.getElementById('timeForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            // Update timesArray with values from the form
            for (let i = 1; i <= players; i++) {
                timesArray[i - 1] = parseInt(document.getElementById(`player${i}`).value);
            }
            // Update display with updated timesArray
            updateAll(-1);
        });
    }

    // Pause Button Update Logic
    let pauseClass = "pauseBtn";

    if(activeNum == 0){
        clearInterval(activeTimerNum);
        pauseClass = "pauseBtnActive";
    }

    pauseBtn.innerHTML = `<div class="${pauseClass}"><h2>Pause Game</h2><p>Press P or 0 to Pause Clocks</p></div>`;


    // Handles Timers
    if((activeNum != 0) && (updateType == 0)){
        clearInterval(activeTimerNum);
        startTimer();
    }
}


// Handles the pressing of any keys as to switch between active players
function logPress(event){
    if (!modifyMode){
        if (event.keyCode == 80) {
            // Execute your desired function or code here
            if(activeNum != 0){
                activeNum = 0;
                updateAll(-1);
            }
        }
        else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
            // Retrieve the value entered by the user
            const inputValue = event.key;
            if ((inputValue <= players) && (inputValue != activeNum)){
                console.log("Event Key:", event.key);
                activeNum = inputValue;
                updateAll(0);
            }
            
        }
        else if (event.code === 'Space' || event.key === ' ') {
            if ((activeNum < players) && (activeNum > 0)){
                activeNum++;
            }
            else if(activeNum != 0){
                activeNum = 1;
            }
            else{
                activeNum = 0;
            }
            updateAll(0);
        }
        else if (event.keyCode == 77){
            if (activeNum != 0){
                activeNum = 0;
                updateAll(1);
            }
        }
    }
}


// handles the event listeners to make sure that the page has loaded first, essentially can be used like a Main Function
document.addEventListener("DOMContentLoaded", function() {
    // Startup Tasks for Initial Display
    updateAll(0)

    document.addEventListener('keydown', function(event) {
        logPress(event);
    });

});