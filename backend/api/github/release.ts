import GitHubApi from 'backend/api/github';
import { GitHubChangelog, GitHubRelease } from 'types/github';

export const getLatestRelease = async (): Promise<GitHubRelease> => {
	const response = await GitHubApi().get('/repos/FuturePortal/CIMonitor/releases/latest');

	return response.data;
};

export const getChangelog = async (): Promise<GitHubChangelog> => {
	const response = await GitHubApi().get('/repos/FuturePortal/CIMonitor/releases');

	return response.data;
};
