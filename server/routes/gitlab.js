const app = (module.exports = require('express')());
const StatusAdapterGitLab = require('../domain/status/adapter/GitLab');

app.post('/', (request, response) => {
    console.log('/gitlab [POST]');

    StatusAdapterGitLab.processWebHook(request.body);

    response.json({
        message: 'Received your web-hook, thank you for your service.',
    });
});
