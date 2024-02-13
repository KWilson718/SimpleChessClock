document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('inputField');
    const playersInput = document.getElementById('players');
    const timeInput = document.getElementById('time');
    const timeTypeInputs = document.getElementsByName('timeType'); // Get radio inputs by name

    // Add submit event listener to the form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the selected time type
        let selectedTimeType;
        for (let i = 0; i < timeTypeInputs.length; i++) {
            if (timeTypeInputs[i].checked) {
                selectedTimeType = timeTypeInputs[i].value;
                break; // Exit loop once the checked radio button is found
            }
        }

        const params = new URLSearchParams({
            players: playersInput.value,
            time: timeInput.value,
            timeType: selectedTimeType
        });
        window.location.href = 'pages/clock.html?' + params.toString();
    });
});