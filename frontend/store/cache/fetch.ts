import CIMonitorAPI from '/frontend/api/cimonitor';
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

	const version: Version = await CIMonitorAPI.get('version');

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
		const contributors: Contributor[] = await CIMonitorAPI.get('contributors');

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
		const changelog: Change[] = await CIMonitorAPI.get('changelog');

		store.dispatch(setChangelog(changelog));

		console.log(`[store/cache/fetch] Fetched ${changelog.length} changelogs from the backend.`);

		return changelog;
	} catch (error) {
		return [];
	}
};
