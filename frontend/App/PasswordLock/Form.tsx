import { FormEvent, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Loader } from './Form.style';

import Icon from '/frontend/components/Icon';
import { setPassword } from '/frontend/store/settings/actions';

type Props = {
	isLoading?: boolean;
};

const PasswordLockForm = ({ isLoading = false }: Props): ReactElement => {
	const [passwordInput, setPasswordInput] = useState('');
	const dispatch = useDispatch();

	if (isLoading) {
		return (
			<Loader>
				<Icon icon="autorenew" /> Verifying password...
			</Loader>
		);
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (passwordInput) {
			dispatch(setPassword(passwordInput));
			setPasswordInput('');
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="password"
				value={passwordInput}
				onChange={(e) => setPasswordInput(e.target.value)}
				placeholder="Enter password"
				disabled={isLoading}
				autoFocus
			/>
			<Button type="submit" disabled={isLoading || !passwordInput}>
				{isLoading ? (
					<>
						<Icon icon="autorenew" /> Validating...
					</>
				) : (
					'Unlock'
				)}
			</Button>
		</Form>
	);
};

export default PasswordLockForm;
