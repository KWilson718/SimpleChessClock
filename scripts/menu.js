document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('inputField');
    const playersInput = document.getElementById('players');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    // Add submit event listener to the form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const params = new URLSearchParams({
            players: playersInput.value,
            hours: hoursInput.value,
            minutes: minutesInput.value,
            seconds: secondsInput.value
        });
        window.location.href = 'pages/clock.html?' + params.toString();
    });
});