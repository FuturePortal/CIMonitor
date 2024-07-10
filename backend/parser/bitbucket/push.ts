// import StatusManager from 'backend/status/manager';
// import { GitHubPush } from 'types/github';
// import Status from 'types/status';
//
// import { getBranch, getTag } from './helper';

class BitBucketPush {
	// parse(id: string, push: GitHubPush): Status {
	// 	let status = StatusManager.getStatus(id);
	//
	// 	if (!status) {
	// 		status = {
	// 			id,
	// 			project: `${push.repository.owner.name} / ${push.repository.name}`,
	// 			state: 'info',
	// 			source: 'github',
	// 			time: new Date().toUTCString(),
	// 			processes: [],
	// 		};
	//
	// 		const branch = getBranch(push.ref);
	// 		if (branch) {
	// 			status.branch = branch;
	// 		}
	//
	// 		const tag = getTag(push.ref);
	// 		if (tag) {
	// 			status.tag = tag;
	// 		}
	// 	}
	//
	// 	return {
	// 		...status,
	// 		username: push.sender.login,
	// 		userUrl: push.sender.html_url,
	// 		userImage: push.sender.avatar_url,
	// 		projectImage: push.repository.owner.avatar_url,
	// 		sourceUrl: push.repository.html_url,
	// 		time: new Date().toUTCString(),
	// 	};
	// }
}

export default new BitBucketPush();
