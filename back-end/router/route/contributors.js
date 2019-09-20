const express = require('express');
const app = (module.exports = express());
const Contributors = require('../../domain/cimonitor/Contributors');

app.get('/', (request, response) => {
    console.log('/contributors [GET]');

    Contributors.getContributors()
        .then(contributors => {
            response.json({
                message: 'Showing a list of all CIMonitor contributors.',
                contributors,
            });
        })
        .catch(() => {
            return response.status(500).json({ message: 'Failed to get a list of contributors from GitHub.' });
        });
});
