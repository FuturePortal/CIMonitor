import { ReactElement, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container, Form, Positioner } from './PasswordLock.style';

import PasswordLockForm from '/frontend/App/PasswordLock/Form';
import MockStatuses from '/frontend/App/Statuses/Mock';
import { getPassword } from '/frontend/store/settings/selectors';

type Props = {
	children: ReactNode;
	formOnly?: boolean;
};

const PasswordLock = ({ children, formOnly = false }: Props): ReactElement | null => {
	const password = useSelector(getPassword);
	const [passwordVerified, setPasswordVerified] = useState(false);
	const [isVerifying, setVerifying] = useState(false);

	if (passwordVerified) {
		return <>{children}</>;
	}

	if (formOnly) {
		return <PasswordLockForm />;
	}

	return (
		<>
			<MockStatuses />
			<Positioner>
				<Container>
					<h1>CIMonitor version PACKAGE_VERSION</h1>
					<PasswordLockForm />
				</Container>
			</Positioner>
		</>
	);
};

export default PasswordLock;
