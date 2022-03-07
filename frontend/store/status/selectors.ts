import { RootState } from 'frontend/store/store';
import Status from 'types/status';

export const getStatus = (state: RootState): Status[] => state.status.status;
