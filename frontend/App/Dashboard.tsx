import { ReactElement } from 'react';

import useSocket from '/frontend/hooks/useSocket';

import AppContext, { getQueryContext } from './AppContext';
import Favicon from './Favicon';
import SettingsPanel from './SettingsPanel';
import SocketConnection from './SocketConnection';
import Statuses from './Statuses';
import Toolbar from './Toolbar';

const Dashboard = (): ReactElement => {
	const { socketConnected } = useSocket();

	return (
		<AppContext.Provider value={getQueryContext()}>
			<Favicon />
			<SocketConnection connected={socketConnected} />
			<Statuses />
			<Toolbar />
			<SettingsPanel />
		</AppContext.Provider>
	);
};

export default Dashboard;
