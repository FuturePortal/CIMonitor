import { SetContributorsAction, SetVersionAction } from './types';

import { Contributor, Version } from '/types/cimonitor';

export const setContributors = (contributors: Contributor[]): SetContributorsAction => ({
	type: 'cache-contributors-set',
	contributors,
});

export const setVersion = (version: Version): SetVersionAction => ({
	type: 'cache-version-set',
	version,
});
