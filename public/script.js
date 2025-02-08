const socket = new WebSocket('ws://192.168.1.110:8080'); // WebSocket server URL

// Event listener for when the WebSocket is opened
socket.onopen = () => {
    console.log('Connected to WebSocket server!');
    updateStatus('Connected to server', 'success');
};

// Event listener for receiving messages from the WebSocket server
socket.onmessage = (event) => {
    const message = event.data;
    console.log('Received message:', message);
    updateStatus('Message received: ' + message, 'info');
};

// Event listener for WebSocket errors
socket.onerror = (error) => {
    console.log('WebSocket error:', error);
    updateStatus('WebSocket error occurred', 'error');
};

// Event listener for when WebSocket is closed
socket.onclose = () => {
    console.log('WebSocket connection closed');
    updateStatus('Connection closed', 'error');
};

// Function to send a message
function sendMessage() {
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        updateStatus('Please enter a message', 'error');
        return;
    }

    // Send the message to the server if socket is open
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        updateStatus('Message sent', 'success');
        console.log(message)
    } else {
        updateStatus('WebSocket is not open', 'error');
    }

    // Clear the input field
    document.getElementById('message').value = '';
}

// Function to update the status message on the page
function updateStatus(message, type = 'info') {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'black';
}