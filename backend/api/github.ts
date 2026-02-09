export { getContributors } from './github/contributors';
export { getChangelog, getLatestRelease } from './github/release';

const GitHubApi = () => {
	const request = async (url: string) => {
		const response = await fetch(`https://api.github.com${url}`, {
			headers: {
				'User-Agent': 'github.com/FuturePortal/CIMonitor',
				accept: 'application/json',
			},
		});

		return response.json();
	};

	return {
		get: (url: string) => request(url),
	};
};

const GitHubApiSingleton = GitHubApi();

export default GitHubApiSingleton;
