const express = require('express');
const app = (module.exports = express());
var httpRequest = require('request');

const getContributorsInfo = contributors =>
    contributors
        .map(contributor => ({
            commits: contributor.total,
            contributor: {
                userName: contributor.author.login,
                url: contributor.author.html_url,
                image: contributor.author.avatar_url,
            },
        }))
        .sort((contributorA, contributorB) => contributorB.commits - contributorA.commits);

app.get('/', (request, response) => {
    console.log('/contributors [GET]');

    httpRequest(
        {
            uri: 'https://api.github.com/repos/CIMonitor/CIMonitor/stats/contributors',
            headers: {
                'User-Agent': 'github.com/CIMonitor/CIMonitor',
                Accept: 'application/json',
            },
        },
        (httpError, httpResponse, httpBody) => {
            if (httpError) {
                return response.json({ message: 'Failed to get a list of contributors from GitHub.' }, 500);
            }

            try {
                const contributors = JSON.parse(httpBody);
                response.json({
                    message: 'Showing a list af all contributors to CIMonitor.',
                    contributors: getContributorsInfo(contributors),
                });
            } catch (error) {
                console.log(error);
                return response.json({ message: 'Internal error formatting contributors' }, 500);
            }
        }
    );
});
