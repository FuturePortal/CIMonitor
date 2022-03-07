import {ReactElement, useEffect, useState} from 'react';

import GlobalStyle from './App.style';
import SocketConnection from './SocketConnection';
import Statusses from './Statusses';
import SettingsPanel from './SettingsPanel';
import Toolbar from './Toolbar';
import { io } from 'socket.io-client';

const App = (): ReactElement => {
    const [serverConnected, setServerConnected] = useState(false);

    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            console.log('[App] Connected to the socket')
            setServerConnected(true);
        });
        socket.on('disconnect', () => {
            console.log('[App] Disconnect to the socket')
            setServerConnected(false);
        });
        socket.on('status-all', (statuses) => console.log('[App] Received all statuses', statuses));

        // Refresh all statuses once a day
        const requestStatusesInterval = setInterval(() => socket.emit('request-statuses'), 60000 * 60 * 24);

        return () => {
            socket.disconnect();
            clearInterval(requestStatusesInterval);
        };
    }, []);

    return (
        <>
            <GlobalStyle />
            <SocketConnection connected={serverConnected} />
            <Statusses />
            <Toolbar />
            <SettingsPanel />
        </>
    );
};

export default App;
