import StatusManager from 'backend/status/manager';
import { BitBucketCommitStatusWebhook } from 'types/bitbucket';
import Status from 'types/status';

class BitBucketBuildParser {
	parse(id: string, build: BitBucketCommitStatusWebhook): Status {
		let status = StatusManager.getStatus(id);

		if (!status) {
			status = {
				id,
				project: `${build.repository.workspace.name} / ${build.repository.name}`,
				state: 'info',
				source: 'bitbucket',
				time: new Date().toUTCString(),
				processes: [],
			};
		}

		// TODO parse build to processes

		const commitUser = build.commit_status.commit.author.user;
		return {
			...status,
			username: commitUser.display_name,
			userUrl: commitUser.links.html.href,
			userImage: commitUser.links.avatar.href,
			projectImage: build.repository.links.avatar.href,
			sourceUrl: build.repository.links.html.href,
			time: new Date().toUTCString(),
		};
	}
}

export default new BitBucketBuildParser();
