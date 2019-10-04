const express = require('express');
const app = (module.exports = express());
const Config = require('../../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

app.post('/', (request, response) => {
    console.log('/password [POST]');

    const postedPassword = request.body.password;
    const serverPassword = Config.getServerPassword();

    if (serverPassword === '' || postedPassword === serverPassword) {
        return response.json({
            message: 'OK!',
        });
    }

    return response.status(401).json({
        message: 'Invalid password provided.',
    });
});

app.get('/', (request, response) => {
    console.log('/password [GET]');

    const serverPassword = Config.getServerPassword();
    const hasServerPassword = serverPassword !== '';

    return response.json({
        message: `A password ${hasServerPassword ? 'is' : `isn't`} set for this CIMonitor.`,
        passwordProtected: hasServerPassword,
    });
});
