import { GitHubConclusion, GitHubStatus } from 'types/github';
import { State, StepState } from 'types/status';

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

        if (conclusion === 'skipped') {
            return 'skipped';
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

export const getBranch = (reference: string): string | null => {
    if (reference.includes('refs/heads')) {
        return reference.replace('refs/heads/', '');
    }

    return null;
};

export const getTag = (reference: string): string | null => {
    if (reference.includes('refs/tags')) {
        return reference.replace('refs/tags/', '');
    }

    return null;
};
