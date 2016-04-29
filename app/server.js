var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var Core = require('./Core/Core');
var dashboardSocket = require('socket.io')(http);
var validate = require('validate.js');

/**
 * Serve static files from /public
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

/**
 * GET /
 *
 * Loads the dashboard
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../public/index.html');
});

/**
 * POST /status
 *
 * Provide a new status for the monitor to process and display
 */
app.post('/status', function (request, response) {
    var statusValidation = require('./Validation/Status');
    var requestBody = request.body;

    requestBody = validate.cleanAttributes(requestBody, statusValidation.whitelist);
    var validationErrors = validate(requestBody, statusValidation.rules);

    if (validationErrors) {
        response.status(422).json(validationErrors);
        return;
    }

    app.core.handleStatus(requestBody);
    response.sendStatus(200);
});

/**
 * POST /jenkins-status
 *
 * Provide a new status from jenkins for the monitor to display
 */
app.post('/jenkins-status', function (request, response) {
    var statusValidation = require('./Validation/JenkinsStatus');
    var requestBody = request.body;

    requestBody = validate.cleanAttributes(requestBody, statusValidation.whitelist);
    var validationErrors = validate(requestBody, statusValidation.rules);

    if (validationErrors) {
        response.status(422).json(validationErrors);
        return;
    }

    app.core.handleJenkinsStatus(requestBody);
    response.sendStatus(200);
});

/**
 * Setup the server and initialise the modules
 */
var server = app.listen(3000, function () {
    console.log('[Server] Ready.');
});

/**
 * Set the application core
 */
app.core = new Core(server, dashboardSocket);
