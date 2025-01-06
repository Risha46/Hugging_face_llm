async function askQuestion() {
    const userQuestion = document.getElementById('userQuestion').value;

    if (!userQuestion) {
        alert('Please enter a question!');
        return;
    }

    try {
        // Make a POST request to the backend
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: userQuestion }),
        });

        const data = await response.json();

        // Display the generated response or error
        const responseBox = document.getElementById('responseBox');
        if (data.response) {
            responseBox.innerText = data.response;
            responseBox.className = 'success'; // Apply success styling
        } else if (data.error) {
            responseBox.innerText = 'Error: ' + data.error;
            responseBox.className = 'error'; // Apply error styling
        }

        // Make the response box visible
        responseBox.style.visibility = 'visible';

        // Clear the question input box
        document.getElementById('userQuestion').value = '';
    } catch (error) {
        const responseBox = document.getElementById('responseBox');
        responseBox.innerText = 'Error: ' + error.message;
        responseBox.className = 'error'; // Apply error styling
        responseBox.style.visibility = 'visible'; // Ensure visibility
    }
}
