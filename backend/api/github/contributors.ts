import GitHubApi from 'backend/api/github';
import { Contributor } from 'types/cimonitor';
import { GitHubContributor, GitHubUser } from 'types/github';

let cachedContributors: Contributor[] = [];

export const getContributors = async (): Promise<Contributor[]> => {
	try {
		const contributors: GitHubContributor[] = await GitHubApi.get(
			'repos/FuturePortal/CIMonitor/stats/contributors'
		);
		const cleanContributors = cleanResponse(contributors);

		if (cleanContributors.length === 0) {
			return cachedContributors;
		}

		const enrichedContributors = await enrichContributors(cleanContributors);
		const sortedContributors = enrichedContributors.sort(byCommits);

		cachedContributors = sortedContributors;

		return sortedContributors;
	} catch (error) {
		if (cachedContributors.length > 0) {
			return cachedContributors;
		}

		throw error;
	}
};

const cleanResponse = (contributors: GitHubContributor[]): Contributor[] =>
	contributors
		.map((contributor) => ({
			commits: contributor.total,
			username: contributor.author.login,
			profile: contributor.author.html_url,
			image: contributor.author.avatar_url,
		}))
		.filter((contributor) => !['T-888', 'dependabot'].includes(contributor.username));

const byCommits = (contributorA: Contributor, contributorB: Contributor): number =>
	contributorB.commits - contributorA.commits;

const enrichContributors = async (contributors: Contributor[]): Promise<Contributor[]> => {
	const enrichedContributors: Contributor[] = [];

	for (let contributor of contributors) {
		enrichedContributors.push(await enrichContributor(contributor));
	}

	return enrichedContributors;
};

const enrichContributor = async (contributor: Contributor): Promise<Contributor> => {
	try {
		const response = await GitHubApi.get(`users/${contributor.username}`);

		const user: GitHubUser = response.data;

		return {
			...contributor,
			site: user.blog,
			location: user.location,
			name: user.name,
			company: user.company,
		};
	} catch (error) {
		return contributor;
	}
};
