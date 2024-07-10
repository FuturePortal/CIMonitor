import StatusManager from 'backend/status/manager';
import { BitBucketChange, BitBucketPush } from 'types/bitbucket';
import Status from 'types/status';

class BitBucketPushParser {
	parse(id: string, push: BitBucketPush, change: BitBucketChange): Status {
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

		return {
			...status,
			username: push.actor.display_name,
			userUrl: push.actor.links.html.href,
			userImage: push.actor.links.avatar.href,
			projectImage: push.repository.links.avatar.href,
			sourceUrl: push.repository.links.html.href,
			time: new Date().toUTCString(),
		};
	}
}

export default new BitBucketPushParser();
