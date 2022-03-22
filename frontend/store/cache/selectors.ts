import { RootState } from 'frontend/store';

import { Contributor, Version } from '/types/cimonitor';

export const getVersion = (state: RootState): Version | null => state.cache.version;

export const getContributors = (state: RootState): Contributor[] | null => state.cache.contributors;
