import { RootState } from 'frontend/store';
import Status from 'types/status';

export const getStatuses = (state: RootState): Status[] => state.status.statuses;
