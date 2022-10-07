import { io } from 'socket.io-client';

import StatusEvents from 'backend/status/events';
import { socketEvent } from 'types/cimonitor';

class SocketClient {
	init() {
		if (!process.env.CIMONITOR_SERVER_URL) {
			console.info('[socket/client] Missing CIMONITOR_SERVER_URL, which is required for the module client.');
			process.exit(1);
		}

		if (!process.env.CIMONITOR_SERVER_URL.match(/^http[s]?:\/\//)) {
			console.info('[socket/client] CIMONITOR_SERVER_URL must start with http/https.');
			process.exit(1);
		}
	}

	listen() {
		console.log(`[socket/client] Connecting to ${process.env.CIMONITOR_SERVER_URL}...`);
		const socket = io(process.env.CIMONITOR_SERVER_URL, {
			secure: false,
		});

		socket.on(socketEvent.connect, () => {
			console.log(`[socket/client] CIMonitor connected.`);
		});

		socket.on(socketEvent.disconnect, () => {
			console.log(`[socket/client] lost connection to ${process.env.CIMONITOR_SERVER_URL}.`);
		});

		socket.on(socketEvent.statusStateChange, (status) => {
			console.log(`[socket/client] Received changed state status.`);
			StatusEvents.emit(StatusEvents.event.statusStateChange, status);
		});

		socket.on(socketEvent.newStatus, (status) => {
			console.log(`[socket/client] Received new status.`);
			StatusEvents.emit(StatusEvents.event.newStatus, status);
		});
	}
}

export default new SocketClient();
