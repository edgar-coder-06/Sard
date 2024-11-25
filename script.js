document.getElementById("submitBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const resultElement = document.getElementById("result");
    const statusElement = document.getElementById("status");

    if (!username) {
        resultElement.textContent = "Please enter a username.";
        return;
    }

    try {
        // Send a POST request to the backend
        const response = await axios.post("http://10.0.40.181:3000/getPercentage", { username });

        if (response.data.percentage !== null) {
            resultElement.textContent = `Percentage: ${response.data.percentage}%`;
        } else {
            resultElement.textContent = "No percentage found for this user.";
        }

        statusElement.textContent = response.data.status;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});
