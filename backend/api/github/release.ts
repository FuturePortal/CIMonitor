import GitHubApi from 'backend/api/github';
import { GitHubRelease } from 'types/github';

export const getLatestRelease = async (): Promise<GitHubRelease> => {
    const response = await GitHubApi().get('/repos/CIMonitor/CIMonitor/releases/latest');

    return response.data;
};
