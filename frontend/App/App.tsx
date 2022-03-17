import { ReactElement } from 'react';

import useSocket from '/frontend/hooks/useSocket';

import Favicon from './Favicon';
import SettingsPanel from './SettingsPanel';
import SocketConnection from './SocketConnection';
import Statuses from './Statuses';
import Toolbar from './Toolbar';

const App = (): ReactElement => {
    const { socketConnected } = useSocket();

    document.title = `CIMonitor ${window.location.host}`;

    return (
        <>
            <Favicon />
            <SocketConnection connected={socketConnected} />
            <Statuses />
            <Toolbar />
            <SettingsPanel />
        </>
    );
};

export default App;
