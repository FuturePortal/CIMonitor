import StatusManager from 'backend/status/manager';
import { GitHubPush } from 'types/github';
import Status from 'types/status';

class GitHubPushParser {
    parsePush(id: string, push: GitHubPush): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: `${push.repository.name} / ${push.organization.login}`,
                state: 'info',
                source: 'github',
                branch: push.ref.replace('refs/heads/', ''),
                time: new Date(),
                processes: [],
            };
        }

        return {
            ...status,
            userImage: push.sender.avatar_url,
            projectImage: push.organization.avatar_url,
            time: new Date(),
        };
    }
}

export default new GitHubPushParser();
