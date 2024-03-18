import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import useSetting from '/frontend/hooks/useSetting';
import Sounds from '/frontend/sounds/Sounds';
import { addStatus, deleteStatus, patchStatus, setAllStatus } from '/frontend/store/status/actions';

import { socketEvent } from '/types/cimonitor';
import Status from '/types/status';

type UseSocketOutput = {
	socketConnected: boolean;
};

const useSocket = (): UseSocketOutput => {
	const [socketConnected, setSocketConnected] = useState(false);
	const dispatch = useDispatch();
	const soundEnabled = useSetting('sound');

	useEffect(() => {
		const socket = io();

		socket.on(socketEvent.connect, () => setSocketConnected(true));
		socket.on(socketEvent.disconnect, () => setSocketConnected(false));
		socket.on(socketEvent.allStatuses, (statuses: Status[]) => dispatch(setAllStatus(statuses)));
		socket.on(socketEvent.patchStatus, (status: Status) => dispatch(patchStatus(status)));
		socket.on(socketEvent.newStatus, (status: Status) => dispatch(addStatus(status)));
		socket.on(socketEvent.statusStateChange, (status: Status) => {
			if (!soundEnabled) {
				return;
			}

			switch (status.state) {
				case 'warning':
					Sounds.playInfo();
					return;
				case 'success':
					Sounds.playSuccess();
					return;
				case 'error':
					Sounds.playError();
					return;
			}
		});
		socket.on(socketEvent.deleteStatus, (statusId: string) => dispatch(deleteStatus(statusId)));

		// Refresh all statuses once a day
		const requestStatusesInterval = setInterval(() => socket.emit(socketEvent.requestAllStatuses), 60000 * 60 * 24);

		return () => {
			socket.disconnect();
			clearInterval(requestStatusesInterval);
		};
	}, [soundEnabled]);

	return {
		socketConnected,
	};
};

export default useSocket;
