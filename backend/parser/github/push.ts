import StatusManager from 'backend/status/manager';
import { GitHubPush } from 'types/github';
import Status from 'types/status';

import { getBranch, getTag } from './helper';

class GitHubPushParser {
    parsePush(id: string, push: GitHubPush): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: `${push.repository.name} / ${push.organization.login}`,
                state: 'info',
                source: 'github',
                time: new Date().toUTCString(),
                processes: [],
            };

            const branch = getBranch(push.ref);
            console.log(`=== BRANCH ${branch} ===`);
            if (branch) {
                status.branch = branch;
            }

            const tag = getTag(push.ref);
            console.log(`=== TAG ${tag} ===`);
            if (tag) {
                status.tag = tag;
            }
        }

        return {
            ...status,
            userImage: push.sender.avatar_url,
            projectImage: push.organization.avatar_url,
            time: new Date().toUTCString(),
        };
    }
}

export default new GitHubPushParser();
