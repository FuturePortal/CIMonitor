import { ReactElement } from 'react';

import PasswordLock from '/frontend/App/PasswordLock';

import Statuses from './Statuses';

const StatusesLock = (): ReactElement => {
	console.log(window.PASSWORD_PROTECTED);

	if (['dashboard', 'settings'].includes(window.PASSWORD_PROTECTED)) {
		return (
			<PasswordLock formOnly>
				<Statuses />
			</PasswordLock>
		);
	}

	return <Statuses />;
};

export default StatusesLock;
