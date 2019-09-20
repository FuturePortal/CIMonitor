const GitHubApi = require('./GitHubApi');

class Contributors {
    getContributors() {
        return GitHubApi.call(`repos/CIMonitor/CIMonitor/stats/contributors`)
            .then(contributors => this.cleanContributorsResponse(contributors))
            .then(contributors => this.removeBots(contributors))
            .then(contributors => this.getContributorDetails(contributors))
            .then(contributors => this.sortContributorsByCommits(contributors));
    }

    cleanContributorsResponse(contributors) {
        return contributors.map(contributor => ({
            commits: contributor.total,
            username: contributor.author.login,
            githubProfile: contributor.author.html_url,
            userImage: contributor.author.avatar_url,
        }));
    }

    getContributorDetails(contributors) {
        const fetchUserDetailPromises = [];
        const detailedContributors = [];

        contributors.forEach(simpleContributor => {
            const fetchDetails = GitHubApi.call(`users/${simpleContributor.username}`)
                .then(userDetails => {
                    console.log(`[Contributors] Fetched details for ${simpleContributor.username}.`);

                    detailedContributors.push({
                        ...simpleContributor,
                        name: userDetails.name,
                        location: userDetails.location,
                    });
                })
                .catch(() => {
                    console.log(`[Contributors] Failed to fetch details for ${simpleContributor.username}.`);

                    detailedContributors.push(simpleContributor);
                });

            fetchUserDetailPromises.push(fetchDetails);
        });

        return Promise.all(fetchUserDetailPromises).then(() => detailedContributors);
    }

    sortContributorsByCommits(contributors) {
        return contributors.sort((contributorA, contributorB) => contributorB.commits - contributorA.commits);
    }

    removeBots(contributors) {
        return contributors.filter(contributor => contributor.username !== 'T-888');
    }
}

module.exports = new Contributors();
