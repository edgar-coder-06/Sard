function fetchPercentage() {
    const username = document.getElementById('username').value;
    const percentageDisplay = document.getElementById('percentageDisplay');
    const requestsDisplay = document.getElementById('requestsDisplay');
    const errorDisplay = document.getElementById('errorDisplay');

    if (username.trim() === "") {
        errorDisplay.textContent = "Please enter a username.";
        percentageDisplay.textContent = "Percentage: ";
        requestsDisplay.textContent = "Requests: ";
        return;
    }

    errorDisplay.textContent = "";
    fetch(`http://91.107.197.203:5000/get_percentage?name=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorDisplay.textContent = data.error;
                percentageDisplay.textContent = "Percentage: ";
                requestsDisplay.textContent = "Requests: ";
            } else {
                percentageDisplay.textContent = `Percentage: ${data.percentage}`;
                requestsDisplay.textContent = `Requests: ${data.requests}`;
            }
        })
        .catch(err => {
            errorDisplay.textContent = "Error: " + err.message;
        });
}
