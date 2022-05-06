import { statusToState } from 'backend/parser/gitlab/helper';
import StatusManager from 'backend/status/manager';
import { GitLabDeployment } from 'types/gitlab';
import Status from 'types/status';

class GitLabDeploymentParser {
    parse(id: string, deployment: GitLabDeployment): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: `${deployment.project.namespace} / ${deployment.project.name}`,
                state: 'info',
                source: 'gitlab',
                time: new Date().toUTCString(),
                processes: [],
                branch: deployment.ref,
            };

            if (deployment.ref) {
                status.branch = deployment.ref;
            }
        }

        if (status.processes.length === 0) {
            status.state = statusToState(deployment.status);
        }

        return {
            ...status,
            projectImage: deployment.project.avatar_url,
            username: deployment.user.name || deployment.user.username,
            userImage: deployment.user.avatar_url,
            userUrl: deployment.user_url,
            sourceUrl: deployment.project.git_http_url,
            tag: deployment.environment,
            time: new Date().toUTCString(),
        };
    }
}

export default new GitLabDeploymentParser();
