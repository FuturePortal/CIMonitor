import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

import StatusEvents from 'backend/status/events';
import StatusManager from 'backend/status/manager';
import { socketEvent } from 'types/cimonitor';
import Status from 'types/status';

class SocketManager {
    socket = null;
    socketId = 0;
    socketConnections = 0;

    startSocket(server: Server): void {
        this.socket = new SocketServer(server, {
            cors: {
                origin: '*',
            },
        });

        this.socket.on(socketEvent.connect, (socket) => this.onClientConnect(socket));

        this.listenToStatusEvents();
    }

    listenToStatusEvents() {
        StatusEvents.on(
            StatusEvents.event.patchStatus,
            (status: Status) => this.socket && this.socket.sockets.emit(socketEvent.patchStatus, status)
        );

        StatusEvents.on(
            StatusEvents.event.newStatus,
            (status: Status) => this.socket && this.socket.sockets.emit(socketEvent.newStatus, status)
        );

        StatusEvents.on(
            StatusEvents.event.deleteStatus,
            (status: Status) => this.socket && this.socket.sockets.emit(socketEvent.deleteStatus, status)
        );

        StatusEvents.on(
            StatusEvents.event.statusStateChange,
            (status: Status) => this.socket && this.socket.sockets.emit(socketEvent.statusStateChange, status)
        );

        StatusEvents.on(
            StatusEvents.event.deleteAllStatuses,
            () => this.socket && this.socket.sockets.emit(socketEvent.allStatuses, [])
        );
    }

    onClientConnect(socket) {
        const socketId = this.getNewSocketId();

        console.log(`[socket/manager] Client ${socketId} connected. Now ${this.socketConnections} connections.`);

        socket.emit(socketEvent.allStatuses, StatusManager.getStatuses());

        socket.on(socketEvent.requestAllStatuses, () => {
            socket.emit(socketEvent.allStatuses, StatusManager.getStatuses());
        });

        socket.on(socketEvent.disconnect, () => {
            this.socketConnections--;
            console.log(`[socket/manager] Client ${socketId} disconnected. Now ${this.socketConnections} connections.`);
        });
    }

    getNewSocketId(): number {
        this.socketId++;
        this.socketConnections++;

        return this.socketId;
    }
}

export default new SocketManager();
