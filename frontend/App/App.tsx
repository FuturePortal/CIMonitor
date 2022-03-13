import { ReactElement } from 'react';

import SocketConnection from './SocketConnection';
import Statuses from './Statuses';
import SettingsPanel from './SettingsPanel';
import Toolbar from './Toolbar';
import useSocket from '/frontend/hooks/useSocket';

const App = (): ReactElement => {
    const { socketConnected } = useSocket();

    return (
        <>
            <SocketConnection connected={socketConnected} />
            <Statuses />
            <Toolbar />
            <SettingsPanel />
        </>
    );
};

export default App;
