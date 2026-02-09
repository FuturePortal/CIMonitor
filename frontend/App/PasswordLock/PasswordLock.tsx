import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Positioner } from './PasswordLock.style';

import { validatePassword } from '/frontend/api/cimonitor/auth';
import PasswordLockForm from '/frontend/App/PasswordLock/Form';
import MockStatuses from '/frontend/App/Statuses/Mock';
import { setPassword } from '/frontend/store/settings/actions';
import { getPassword } from '/frontend/store/settings/selectors';

type Props = {
	children: ReactNode;
	formOnly?: boolean;
};

const PasswordLock = ({ children, formOnly = false }: Props): ReactElement | null => {
	const dispatch = useDispatch();
	const password = useSelector(getPassword);
	const [passwordVerified, setPasswordVerified] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);

	useEffect(() => {
		const checkStoredPassword = async () => {
			if (!password) {
				return;
			}

			setIsVerifying(true);

			try {
				const result = await validatePassword(password);

				if (result.valid) {
					setPasswordVerified(true);
				} else {
					window.alert(result.reason);
					dispatch(setPassword(''));
				}
			} catch (error) {
				window.alert('Failed to verify the password.');
				dispatch(setPassword(''));
			} finally {
				setIsVerifying(false);
			}
		};

		checkStoredPassword();
	}, [password]);

	if (passwordVerified) {
		return <>{children}</>;
	}

	if (formOnly) {
		return <PasswordLockForm isLoading={isVerifying} />;
	}

	return (
		<>
			<MockStatuses />
			<Positioner>
				<Container>
					<h1>CIMonitor version PACKAGE_VERSION</h1>
					<PasswordLockForm isLoading={isVerifying} />
				</Container>
			</Positioner>
		</>
	);
};

export default PasswordLock;
