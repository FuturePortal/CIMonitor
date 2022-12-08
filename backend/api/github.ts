import axios from 'axios';

export { getContributors } from './github/contributors';
export { getChangelog, getLatestRelease } from './github/release';

const GitHubApi = () =>
	axios.create({
		headers: {
			'User-Agent': 'github.com/FuturePortal/CIMonitor',
			accept: 'application/json',
		},
		baseURL: 'https://api.github.com',
	});

export default GitHubApi;
