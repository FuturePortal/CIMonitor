import Status from 'types/status';
import { GitHubPush } from 'types/github';
import StatusManager from 'backend/status/manager';

class GitHubPushParser {
    parsePush(id: string, push: GitHubPush): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: push.repository.name,
                state: 'info',
                source: 'github',
                branch: push.ref.replace('refs/head/', ''),
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
