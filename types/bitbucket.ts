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

export type BitBucketPush = {
	push: {
		changes: BitBucketChangeWrapper[];
	};
	repository: BitBucketRepository;
	actor: BitBucketUser;
};
