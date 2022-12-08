import { RootState } from 'frontend/store';

import { Change, Contributor, Version } from '/types/cimonitor';

export const getVersion = (state: RootState): Version | null => state.cache.version;

export const getContributors = (state: RootState): Contributor[] => state.cache.contributors ?? [];

export const getChangelog = (state: RootState): Change[] => state.cache.changelog ?? [];
