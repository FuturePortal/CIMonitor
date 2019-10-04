const express = require('express');
const app = (module.exports = express());
const StatusAdapterGitLab = require('../../domain/status/adapter/GitLab');
const StatusAdapterTravisCI = require('../../domain/status/adapter/TravisCI');
const StatusAdapterDeployer = require('../../domain/status/adapter/Deployer');

app.use(express.urlencoded({ extended: true }));

app.post('/gitlab', (request, response) => {
    console.log('/webhook/gitlab [POST]');

    StatusAdapterGitLab.processWebHook(request.body)
        .then(status => {
            if (status === 'ignore') {
                return response.status(200).json({
                    message: 'Received your webhook, thank you for your service. Ignoring status.',
                });
            }

            if (typeof status === 'object') {
                return response.status(201).json({
                    message: 'Received your webhook, thank you for your service.',
                    status: status.getRawData(),
                });
            }

            response.status(422).json({
                message: `CIMonitor only processes 'pipeline' and 'build' events.`,
            });
        })
        .catch(error => {
            response.status(500).json(error);
        });
});

app.post('/travis', (request, response) => {
    console.log('/webhook/travis [POST]');

    StatusAdapterTravisCI.processWebHook(request.body.payload)
        .then(status => {
            if (status === 'no-pull-request') {
                return response.status(422).json({
                    message: 'Not processing PR builds.',
                });
            }

            return response.status(201).json({
                message: 'Received your webhook, thank you for your service.',
                status: status.getRawData(),
            });
        })
        .catch(error => {
            response.status(500).json(error);
        });
});

app.post('/deployer', (request, response) => {
    console.log('/webhook/deployer [POST]');

    StatusAdapterDeployer.processWebHook(request.body)
        .then(status => {
            if (status === 'unknown-status') {
                return response.status(422).json({
                    message: 'Not processing unknown statuses.',
                });
            }

            return response.status(201).json({
                message: 'Received your webhook, thank you for your service.',
                status: status.getRawData(),
            });
        })
        .catch(error => {
            response.status(500).json(error);
        });
});
