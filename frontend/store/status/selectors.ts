import { RootState } from 'frontend/store';

import Status, { State } from 'types/status';

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

export const getStatusCount = (state: RootState): number => state.status.statuses.length;
