ESP32 WebSocket Server

Overview

This is a Node.js WebSocket server designed to facilitate real-time communication between an ESP32 microcontroller and a client. The ESP32 establishes a WebSocket connection with the server, and messages sent by the client are relayed to the ESP32.

Project structure: 
```
ESP32_WebSocket_Server/
│── server.js             # Main WebSocket server
│── package.json          # Node.js dependencies
│── README.md             # Documentation
```
📦 Dependencies:

•	Node.js (>=16.x) \n
•	ws (WebSocket library for Node.js)
	
1: Clone the repository:
```
  git clone https://github.com/maxkoste/ESP32_server_project.git
  cd ESP32_server_project
```
2: Install dependencies:
```	
 npm install ws
``` 
3: Run the websocket server

 	node server.js


 ESP32 Connection:
  	•	The ESP32 should connect to the server at ws://<server-ip>:8080.
	•	Any message sent from a client will be forwarded to the ESP32.

 Usage
	•	The ESP32 connects as the first client and is recognized as the main WebSocket device.
	•	Other clients can connect and send messages to the ESP32 through the server.
	•	Logs will display incoming and forwarded messages.

Example Output:
```
Client connected!
ESP32 connected!
Received message from client: Hello ESP32!
Sending message to ESP32: Hello ESP32!
Client disconnected!
ESP32 disconnected!
```
