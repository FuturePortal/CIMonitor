import { ReactElement } from 'react';

import GlobalStyle from './App.style';
import SocketConnection from './SocketConnection';
import Statusses from './Statusses';
import SettingsPanel from './SettingsPanel';
import Toolbar from './Toolbar';

const App = (): ReactElement => (
    <>
        <GlobalStyle />
        <SocketConnection />
        <Statusses />
        <Toolbar />
        <SettingsPanel />
    </>
);

export default App;
