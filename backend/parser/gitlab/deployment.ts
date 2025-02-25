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
				project: deployment.project.path_with_namespace,
				state: 'info',
				source: 'gitlab',
				time: new Date().toUTCString(),
				processes: [],
				branch: deployment.ref,
				username: deployment.user.name || deployment.user.username,
				userImage: deployment.user.avatar_url,
				userUrl: deployment.user_url,
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
			sourceUrl: deployment.project.git_http_url,
			url: deployment.environment_external_url,
			time: new Date().toUTCString(),
		};
	}
}

export default new GitLabDeploymentParser();
