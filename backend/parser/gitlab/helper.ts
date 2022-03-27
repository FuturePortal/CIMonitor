import { State, StepState } from 'types/status';

export const statusToState = (status: string): State => {
    const gitlabStatuses = {
        pending: 'warning',
        running: 'warning',
        failed: 'error',
        success: 'success',
    };

    return gitlabStatuses[status] || 'info';
};

export const statusToStepState = (status: string, allowFailure: boolean): StepState => {
    switch (status) {
        case 'failed':
            return allowFailure ? 'soft-failed' : 'failed';
        case 'success':
            return 'success';
        case 'running':
            return 'running';
        case 'pending':
            return 'pending';
        default:
            return 'created';
    }
};
