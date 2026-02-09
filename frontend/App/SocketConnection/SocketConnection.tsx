import { Fragment, ReactElement } from 'react';

import { WarningBar } from './SocketConnection.style';

type Props = {
	connected: boolean;
};

const SocketConnection = ({ connected }: Props): ReactElement => {
	if (connected) {
		return <Fragment />;
	}

	return <WarningBar>Connection lost</WarningBar>;
};

export default SocketConnection;
