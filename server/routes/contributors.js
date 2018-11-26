const express = require('express');
const app = (module.exports = express());
var requestPromise = require('request-promise');

const getContributorsInfo = contributors =>
    contributors
        .map(contributor => ({
            commits: contributor.total,
            username: contributor.author.login,
            githubProfile: contributor.author.html_url,
            userImage: contributor.author.avatar_url,
        }))
        .sort((contributorA, contributorB) => contributorB.commits - contributorA.commits);

const getRequestObject = uri => ({
    uri,
    headers: {
        'User-Agent': 'github.com/CIMonitor/CIMonitor',
        Accept: 'application/json',
    },
});

app.get('/', (request, response) => {
    console.log('/contributors [GET]');

    requestPromise(getRequestObject('https://api.github.com/repos/CIMonitor/CIMonitor/stats/contributors'))
        .then(body => {
            console.log(`[Contributors] Fetched simple list of the contributors from GitHub.`);

            const contributors = getContributorsInfo(JSON.parse(body));
            const fetchUserDetailPromises = [];
            const detailedContributors = [];

            contributors.forEach(simpleContributor => {
                const fetchDetails = requestPromise(
                    getRequestObject(`https://api.github.com/users/${simpleContributor.username}`)
                )
                    .then(body => {
                        const userDetails = JSON.parse(body);
                        console.log(`[Contributors] Fetched details for ${simpleContributor.username}.`);

                        detailedContributors.push({
                            ...simpleContributor,
                            name: userDetails.name,
                            blog: userDetails.blog,
                            location: userDetails.location,
                        });
                    })
                    .catch(() => {
                        console.log(`[Contributors] Failed to fetch details for ${simpleContributor.username}.`);

                        detailedContributors.push(simpleContributor);
                    });

                fetchUserDetailPromises.push(fetchDetails);
            });

            Promise.all(fetchUserDetailPromises).then(() => {
                console.log(`[Contributors] Pushing list of the contributors.`);

                response.json({
                    message: 'Showing a list af all contributors to CIMonitor.',
                    contributors: detailedContributors,
                });
            });
        })
        .catch(error => {
            console.log(error);
            return response.json({ message: 'Failed to get a list of contributors from GitHub.' }, 500);
        });

    /*httpRequest(
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

            const contributors = getContributorsInfo(JSON.parse(httpBody));

            // promise all users de moeder

            response.json({
                message: 'Showing a list af all contributors to CIMonitor.',
                contributors: contributors,
            });
        }
    );*/
});
