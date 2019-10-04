const express = require('express');
const app = (module.exports = express());
const VersionChecker = require('../../domain/cimonitor/VersionChecker');

app.get('/', (request, response) => {
    console.log('/version [GET]');

    response.json({
        message: 'Showing running CIMonitor server version.',
        version: VersionChecker.getCurrentVersion(),
    });
});
