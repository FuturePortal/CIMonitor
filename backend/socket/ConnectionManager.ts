import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import StatusManager from '../statusses/StatusManager';

class ConnectionManager {
    socket = null;
    socketId = 0;
    socketConnections = 0;

    constructor() {
        // Set status listeners
    }

    startSocket(server: Server): void {
        this.socket = new SocketServer(server);

        this.socket.on('connect', (socket) => this.onClientConnect(socket));
    }

    onClientConnect(socket) {
        const socketId = this.getNewSocketId();

        console.log(`[ConnectionManager] Client ${socketId} connected.`);

        socket.emit('status-all', StatusManager.getStatusses());

        socket.on('request-statuses', () => {
            socket.emit('status-all', StatusManager.getStatusses());
        });

        socket.on('disconnect', () => {
            this.socketConnections--;
            console.log(`[ConnectionManager] Client ${socketId} disconnected.`);
        });
    }

    getNewSocketId(): number {
        this.socketId++;
        this.socketConnections++;

        return this.socketId;
    }
}

export default new ConnectionManager();
