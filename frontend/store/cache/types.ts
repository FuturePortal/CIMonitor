import { Contributor, Version } from '/types/cimonitor';

export type StateType = {
	version: Version | null;
	lastVersionCheck: number;
	contributors: Contributor[];
	lastContributorCheck: number;
};

export type SetVersionAction = {
	type: 'cache-version-set';
	version: Version;
};

export type SetContributorsAction = {
	type: 'cache-contributors-set';
	contributors: Contributor[];
};

export type ActionTypes = SetVersionAction | SetContributorsAction;
