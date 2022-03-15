import { State } from 'types/status';
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
