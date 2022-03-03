import { ReactElement, useEffect } from 'react';

import GlobalStyle from './App.style';
import SocketConnection from './SocketConnection';
import Statusses from './Statusses';
import SettingsPanel from './SettingsPanel';
import Toolbar from './Toolbar';
import { io } from 'socket.io-client';

const App = (): ReactElement => {
    useEffect(() => {
        const socket = io();

        socket.on('connect', () => console.log('Connected to the socket'));
        socket.on('disconnect', () => console.log('Disconnect to the socket'));
        socket.on('status-all', (statuses) => console.log(statuses));

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <GlobalStyle />
            <SocketConnection />
            <Statusses />
            <Toolbar />
            <SettingsPanel />
        </>
    );
};

export default App;
