import StatusManager from 'backend/status/manager';
import { BitBucketChange, BitBucketPushWebhook } from 'types/bitbucket';
import Status from 'types/status';

class BitBucketPushParser {
	parse(id: string, push: BitBucketPushWebhook, change: BitBucketChange): Status {
		let status = StatusManager.getStatus(id);

		if (!status) {
			status = {
				id,
				project: `${push.repository.workspace.name} / ${push.repository.name}`,
				state: 'info',
				source: 'bitbucket',
				time: new Date().toUTCString(),
				processes: [],
			};

			if (change.type === 'branch') {
				status.branch = change.name;
			}

			if (change.type === 'tag') {
				status.tag = change.name;
			}
		}

		const commitUser = change.target.author.user;
		return {
			...status,
			username: commitUser.display_name,
			userUrl: commitUser.links.html.href,
			userImage: commitUser.links.avatar.href,
			projectImage: push.repository.links.avatar.href,
			sourceUrl: push.repository.links.html.href,
			time: new Date().toUTCString(),
		};
	}
}

export default new BitBucketPushParser();
