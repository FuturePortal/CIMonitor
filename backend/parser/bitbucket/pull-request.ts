import StatusManager from 'backend/status/manager';
import { BitBucketPullRequestWebhook } from 'types/bitbucket';
import Status from 'types/status';

class BitBucketPullRequestParser {
	parse(id: string, pr: BitBucketPullRequestWebhook): Status {
		let status = StatusManager.getStatus(id);

		if (!status) {
			status = {
				id,
				project: `${pr.repository.workspace.name} / ${pr.repository.name}`,
				state: 'info',
				source: 'bitbucket',
				time: new Date().toUTCString(),
				processes: [],
			};
		}

		const commitUser = pr.actor;
		return {
			...status,
			branch: pr.pullrequest.source.branch.name,
			username: commitUser.display_name,
			userUrl: commitUser.links.html.href,
			userImage: commitUser.links.avatar.href,
			mergeTitle: pr.pullrequest.title,
			mergeUrl: pr.pullrequest.links.html.href,
			projectImage: pr.repository.links.avatar.href,
			sourceUrl: pr.repository.links.html.href,
			time: new Date().toUTCString(),
		};
	}
}

export default new BitBucketPullRequestParser();
