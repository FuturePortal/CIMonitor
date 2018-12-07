const requestPromise = require('request-promise');

class GitHubApi {
    call(uri, method = 'GET') {
        return requestPromise({
            uri: `https://api.github.com/${uri}`,
            method,
            headers: {
                'User-Agent': 'github.com/CIMonitor/CIMonitor',
            },
            json: true,
        });
    }
}

module.exports = new GitHubApi();
