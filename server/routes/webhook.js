const express = require('express');
const app = (module.exports = express());
const StatusAdapterGitLab = require('../domain/status/adapter/GitLab');
const StatusAdapterTravisCI = require('../domain/status/adapter/TravisCI');

app.use(express.urlencoded({ extended: true }));

app.post('/gitlab', (request, response) => {
    console.log('/webhook/gitlab [POST]');

    StatusAdapterGitLab.processWebHook(request.body);

    response.json({
        message: 'Received your web-hook, thank you for your service.',
    });
});

app.post('/travis', (request, response) => {
    console.log('/webhook/travis [POST]');

    StatusAdapterTravisCI.processWebHook(request.body.payload);

    response.json({
        message: 'Received your web-hook, thank you for your service.',
    });
});
