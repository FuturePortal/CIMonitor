import Status from 'types/status';
import { SetAllStatusAction } from 'frontend/store/status/types';

export const setAllStatus = (status: Status[]): SetAllStatusAction => {
    return {
        type: 'set-all-status',
        status,
    };
};
