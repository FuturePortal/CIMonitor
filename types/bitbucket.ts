export type BitBucketRepository = {
	name: string;
	full_name: string;
	links: {
		avatar: {
			href: string;
		};
		html: {
			href: string;
		};
	};
	workspace: {
		name: string;
	};
};

export type BitBucketUser = {
	display_name: string;
	links: {
		avatar: {
			href: string;
		};
		html: {
			href: string;
		};
	};
};

export type BitBucketBuildState = 'INPROGRESS' | 'FAILED' | 'SUCCESSFUL';

export type BitBucketChange = {
	name: string; // branch/tag name
	type: 'branch' | 'tag' | unknown;
	target: {
		message: string; // commit message
		author: {
			user: BitBucketUser;
		};
	};
};

export type BitBucketChangeWrapper = {
	old: BitBucketChange | null;
	new: BitBucketChange;
};

export type BitBucketPushWebhook = {
	push: {
		changes: BitBucketChangeWrapper[];
	};
	repository: BitBucketRepository;
	actor: BitBucketUser;
};

export type BitBucketCommitStatusWebhook = {
	commit_status: {
		key: string;
		type: 'build' | unknown;
		state: BitBucketBuildState;
		name: string;
		refname: string | null; // branch name
		commit: {
			message: string;
			author: {
				user: BitBucketUser;
			};
		};
	};
	repository: BitBucketRepository;
	actor: BitBucketUser;
};

export type BitBucketPullRequestWebhook = {
	pullrequest: {
		title: string;
		source: {
			branch: {
				name: string;
			};
		};
		links: {
			html: {
				href: string;
			};
		};
	};
	repository: BitBucketRepository;
	actor: BitBucketUser;
};
