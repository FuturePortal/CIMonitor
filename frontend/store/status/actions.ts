import { AddStatusAction, PatchStatusAction, SetAllStatusAction } from 'frontend/store/status/types';

import Status from 'types/status';

export const setAllStatus = (statuses: Status[]): SetAllStatusAction => {
    return {
        type: 'status-set-all',
        statuses,
    };
};

export const addStatus = (status: Status): AddStatusAction => {
    return {
        type: 'status-add',
        status,
    };
};

export const patchStatus = (status: Status): PatchStatusAction => {
    return {
        type: 'status-patch',
        status,
    };
};
