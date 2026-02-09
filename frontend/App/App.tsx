import { ReactElement } from 'react';

import Dashboard from '/frontend/App/Dashboard';
import PasswordLock from '/frontend/App/PasswordLock';

const App = (): ReactElement => {
	if (window.PASSWORD_PROTECTED === 'dashboard') {
		return (
			<PasswordLock>
				<Dashboard />
			</PasswordLock>
		);
	}

	return <Dashboard />;
};

export default App;
