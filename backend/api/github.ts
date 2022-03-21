import axios from 'axios';

import { GitHubRelease } from 'types/github';

class GitHubApi {
    getClient() {
        return axios.create({
            headers: {
                'User-Agent': 'github.com/CIMonitor/CIMonitor',
                accept: 'application/json',
            },
            baseURL: 'https://api.github.com',
        });
    }

    async getLatestRelease(): Promise<GitHubRelease> {
        const response = await this.getClient().get('/repos/CIMonitor/CIMonitor/releases/latest');

        return response.data;
    }
}

export default new GitHubApi();
