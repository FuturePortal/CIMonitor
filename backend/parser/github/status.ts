import { State, StepState } from 'types/status';
import { GitHubConclusion, GitHubStatus } from 'types/github';

export const getStateFromStatus = (status: GitHubStatus, conclusion: GitHubConclusion): State => {
    if (conclusion !== null) {
        if (conclusion === 'failure') {
            return 'error';
        }

        return 'success';
    }

    if (['queued', 'in_progress'].includes(status)) {
        return 'warning';
    }

    return 'info';
};

export const getJobStateFromStatus = (status: GitHubStatus, conclusion: GitHubConclusion): StepState => {
    if (conclusion !== null) {
        if (conclusion === 'failure') {
            return 'failed';
        }

        return 'success';
    }

    if (status === 'in_progress') {
        return 'running';
    }

    if (status === 'queued') {
        return 'pending';
    }

    return 'created';
};