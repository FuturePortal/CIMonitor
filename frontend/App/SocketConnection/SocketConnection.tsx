import { ReactElement } from 'react';

import { WarningBar } from './SocketConnection.style';

type Props = {
	connected: boolean;
};

const SocketConnection = ({ connected }: Props): ReactElement | null => {
	if (connected) {
		return null;
	}

	return <WarningBar>Connection lost</WarningBar>;
};

export default SocketConnection;
