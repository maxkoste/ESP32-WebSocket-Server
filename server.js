const WebSocket = require("ws");

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

let esp32Socket = null; // This will hold the ESP32 connection

wss.on('connection', (ws, req) => {
    console.log('Client connected!');

    // Check if this is the first connection (ESP32) and set esp32Socket
    if (esp32Socket === null) {
        esp32Socket = ws;
        console.log('ESP32 connected!');
    } else {
        console.log('Non-ESP32 client connected, ignoring...');
    }

    // When a message is received from the client (either ESP32 or others)
    ws.on('message', (message) => {
        console.log('Received message from client:', message);

        // If the message is a Buffer, convert it to a string
        if (Buffer.isBuffer(message)) {
            message = message.toString();
        }

        // If the ESP32 socket is available, forward the message to it
        if (esp32Socket && esp32Socket.readyState === WebSocket.OPEN) {
            console.log('Sending message to ESP32:', message);
            esp32Socket.send(message);
        }
    });

    // Handle WebSocket connection close
    ws.on('close', () => {
        console.log('Client disconnected!');
        // If ESP32 disconnects, set esp32Socket to null
        if (esp32Socket === ws) {
            esp32Socket = null;
            console.log('ESP32 disconnected!');
        }
    });

    // Handle WebSocket errors
    ws.on('error', (err) => {
        console.error('WebSocket error: ', err);
    });
});

// Error handling for WebSocket server
wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});