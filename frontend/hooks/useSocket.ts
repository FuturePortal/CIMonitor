import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { addStatus, patchStatus, setAllStatus } from '/frontend/store/status/actions';

import socketEvent from '/types/socket';

type UseSocketOutput = {
    socketConnected: boolean;
};

const useSocket = (): UseSocketOutput => {
    const [socketConnected, setSocketConnected] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io();

        socket.on(socketEvent.connect, () => setSocketConnected(true));
        socket.on(socketEvent.disconnect, () => setSocketConnected(false));
        socket.on(socketEvent.allStatuses, (statuses) => dispatch(setAllStatus(statuses)));
        socket.on(socketEvent.patchStatus, (status) => dispatch(patchStatus(status)));
        socket.on(socketEvent.newStatus, (status) => dispatch(addStatus(status)));
        // TODO: delete status

        // Refresh all statuses once a day
        const requestStatusesInterval = setInterval(() => socket.emit(socketEvent.requestAllStatuses), 60000 * 60 * 24);

        return () => {
            socket.disconnect();
            clearInterval(requestStatusesInterval);
        };
    }, []);

    return {
        socketConnected,
    };
};

export default useSocket;
