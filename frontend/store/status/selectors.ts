import { RootState } from '/frontend/store/store';

import Status, { State } from '/types/status';

export const getStatuses = (state: RootState): Status[] => state.status.statuses;

export const getGlobalState = (state: RootState): State => {
	if (state.status.statuses.find((status) => status.state === 'error')) {
		return 'error';
	}

	if (state.status.statuses.find((status) => status.state === 'warning')) {
		return 'warning';
	}

	return 'success';
};

export const hasNoStatuses = (state: RootState): boolean => state.status.received && state.status.statuses.length === 0;
