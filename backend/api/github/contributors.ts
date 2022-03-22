import GitHubApi from 'backend/api/github';
import { Contributor } from 'types/cimonitor';
import { GitHubContributor, GitHubUser } from 'types/github';

export const getContributors = async (): Promise<Contributor[]> => {
    const response = await GitHubApi().get('repos/CIMonitor/CIMonitor/stats/contributors');

    const contributors: GitHubContributor[] = response.data;

    const cleanContributors = cleanResponse(contributors);

    const enrichedContributors = await enrichContributors(cleanContributors);

    return enrichedContributors.sort(byCommits);
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
        const response = await GitHubApi().get(`users/${contributor.username}`);

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
