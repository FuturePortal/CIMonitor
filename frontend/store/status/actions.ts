import {
    AddStatusAction,
    DeleteStatusAction,
    PatchStatusAction,
    SetAllStatusAction,
} from '/frontend/store/status/types';

import Status from '/types/status';

export const setAllStatus = (statuses: Status[]): SetAllStatusAction => ({
    type: 'status-set-all',
    statuses,
});

export const addStatus = (status: Status): AddStatusAction => ({
    type: 'status-add',
    status,
});

export const patchStatus = (status: Status): PatchStatusAction => ({
    type: 'status-patch',
    status,
});

export const deleteStatus = (statusId: string): DeleteStatusAction => ({
    type: 'status-delete',
    statusId,
});
