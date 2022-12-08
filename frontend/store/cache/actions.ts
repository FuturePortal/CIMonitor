import { SetChangelogAction, SetContributorsAction, SetVersionAction } from './types';

import { Change, Contributor, Version } from '/types/cimonitor';

export const setContributors = (contributors: Contributor[]): SetContributorsAction => ({
	type: 'cache-contributors-set',
	contributors,
});

export const setVersion = (version: Version): SetVersionAction => ({
	type: 'cache-version-set',
	version,
});

export const setChangelog = (changelog: Change[]): SetChangelogAction => ({
	type: 'cache-changelog-set',
	changelog,
});
