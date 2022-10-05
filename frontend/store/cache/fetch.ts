import axios from 'axios';

import store, { RootState } from '/frontend/store';

import { setContributors, setVersion } from './actions';

import { Contributor, Version } from '/types/cimonitor';

export const fetchVersion = async () => {
	const { cache }: RootState = store.getState();

	if (cache.lastVersionCheck > new Date().getTime() - 60000 * 5) {
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

	if (cache.lastContributorCheck > new Date().getTime() - 60000 * 5) {
		console.log(`[store/cache/fetch] Serving ${cache.contributors.length} contributors from cache.`);
		return cache.contributors;
	}

	try {
		const response = await axios.get('/contributors');

		const contributors: Contributor[] = response.data;

		store.dispatch(setContributors(contributors));

		console.log(`[store/cache/fetch] Fetched ${contributors.length} contributors from the backend.`);

		return contributors;
	} catch (error) {
		return [];
	}
};
