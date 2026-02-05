import axios from 'axios';

import store from '/frontend/store';
import { RootState } from '/frontend/store/store';

import { setChangelog, setContributors, setVersion } from './actions';

import { Change, Contributor, Version } from '/types/cimonitor';

const isCacheOlderThanFiveMinutes = (cacheTime: number) => cacheTime > new Date().getTime() - 60000 * 5;

export const fetchVersion = async () => {
	const { cache }: RootState = store.getState();

	if (isCacheOlderThanFiveMinutes(cache.lastVersionCheck)) {
		console.log(`[store/cache/fetch] Serving latest version from cache.`);
		return cache.version;
	}

	const response = await axios.get('/version');

	const version: Version = response.data;

	store.dispatch(setVersion(version));

	console.log(`[store/cache/fetch] Fetched latest version ${version.latest || version.server} from the backend.`);

	return version;
};

export const fetchContributors = async (): Promise<Contributor[]> => {
	const { cache }: RootState = store.getState();

	if (isCacheOlderThanFiveMinutes(cache.lastContributorCheck)) {
		console.log(`[store/cache/fetch] Serving ${cache.contributors.length} contributors from cache.`);
		return cache.contributors;
	}

	try {
		const response = await axios.get('/contributors');

		const contributors: Contributor[] = response.data;

		if (contributors.length > 0) {
			store.dispatch(setContributors(contributors));

			console.log(`[store/cache/fetch] Fetched ${contributors.length} contributors from the backend.`);
			return contributors;
		}

		console.log(`[store/cache/fetch] Fetched no contributors from the backend.`);
		return [];
	} catch (error) {
		return [];
	}
};

export const fetchChangelog = async (): Promise<Change[]> => {
	const { cache }: RootState = store.getState();

	if (isCacheOlderThanFiveMinutes(cache.lastChangelogCheck)) {
		console.log(`[store/cache/fetch] Serving changelog from cache.`);
		return cache.changelog;
	}

	try {
		const response = await axios.get('/changelog');

		const changelog: Change[] = response.data;

		store.dispatch(setChangelog(changelog));

		console.log(`[store/cache/fetch] Fetched ${changelog.length} changelogs from the backend.`);

		return changelog;
	} catch (error) {
		return [];
	}
};
