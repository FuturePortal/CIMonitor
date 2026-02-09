import GitHubApi from 'backend/api/github';
import { GitHubChangelog, GitHubRelease } from 'types/github';

export const getLatestRelease = async (): Promise<GitHubRelease> => {
	return GitHubApi.get('/repos/FuturePortal/CIMonitor/releases/latest');
};

export const getChangelog = async (): Promise<GitHubChangelog> => {
	return GitHubApi.get('/repos/FuturePortal/CIMonitor/releases');
};
