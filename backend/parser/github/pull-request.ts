import StatusManager from 'backend/status/manager';
import { GitHubPullRequest } from 'types/github';
import Status from 'types/status';

class GitHubPullRequestParser {
    parse(id: string, pullRequest: GitHubPullRequest): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: `${pullRequest.organization.login} / ${pullRequest.repository.name}`,
                state: 'info',
                source: 'github',
                time: new Date().toUTCString(),
                processes: [],
                branch: pullRequest.pull_request.head.ref,
            };
        }

        return {
            ...status,
            username: pullRequest.sender.login,
            userUrl: pullRequest.sender.html_url,
            userImage: pullRequest.sender.avatar_url,
            projectImage: pullRequest.organization.avatar_url,
            sourceUrl: pullRequest.repository.html_url,
            mergeTitle: pullRequest.pull_request.title,
            mergeUrl: pullRequest.pull_request.html_url,
            time: new Date().toUTCString(),
        };
    }
}

export default new GitHubPullRequestParser();
