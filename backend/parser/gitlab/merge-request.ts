import StatusManager from 'backend/status/manager';
import { GitLabMergeRequest } from 'types/gitlab';
import Status from 'types/status';

class GitLabMergeRequestParser {
	parse(id: string, mergeRequest: GitLabMergeRequest): Status {
		let status = StatusManager.getStatus(id);

		if (!status) {
			status = {
				id,
				project: mergeRequest.project.path_with_namespace,
				state: 'info',
				source: 'gitlab',
				time: new Date().toUTCString(),
				processes: [],
				username: mergeRequest.user.name || mergeRequest.user.username,
				userImage: mergeRequest.user.avatar_url,
				branch: mergeRequest.object_attributes.source_branch,
			};

			if (mergeRequest.object_attributes.source_branch) {
				status.branch = mergeRequest.object_attributes.source_branch;
			}
		}

		return {
			...status,
			projectImage: mergeRequest.project.avatar_url,
			sourceUrl: mergeRequest.project.git_http_url,
			mergeTitle: mergeRequest.object_attributes.title,
			mergeUrl: mergeRequest.object_attributes.url,
			time: new Date().toUTCString(),
		};
	}
}

export default new GitLabMergeRequestParser();
