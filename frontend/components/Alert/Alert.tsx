import { ReactElement, ReactNode } from 'react';

import { Container, IconSpace, Message } from './Alert.style';

import Icon from '/frontend/components/Icon';

import { State } from '/types/status';

type Props = {
	children: ReactNode;
	state?: State;
};

const getIcon = (state: State): string => {
	if (state === 'success') {
		return 'check_circle_outline';
	}

	if (state === 'warning') {
		return 'warning_amber';
	}

	if (state === 'error') {
		return 'highlight_off';
	}

	return 'help_outline';
};

const Alert = ({ children, state = 'info' }: Props): ReactElement => (
	<Container state={state}>
		<IconSpace>
			<Icon icon={getIcon(state)} />
		</IconSpace>
		<Message>{children}</Message>
	</Container>
);

export default Alert;
