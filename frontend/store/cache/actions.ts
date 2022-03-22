import { Contributor, Version } from 'types/cimonitor';

import { SetContributorsAction, SetVersionAction } from './types';

export const setContributors = (contributors: Contributor[]): SetContributorsAction => ({
    type: 'cache-contributors-set',
    contributors,
});

export const setVersion = (version: Version): SetVersionAction => ({
    type: 'cache-version-set',
    version,
});
