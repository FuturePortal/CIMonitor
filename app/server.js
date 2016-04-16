var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var Core = require('./core/core');
var dashboardSocket = require('socket.io')(http);

/**
 * Serve static files from /public
 */
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
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
    if (app.core.handleStatus(request.body)) {
        response.sendStatus(200);
    } else {
        response.sendStatus(422);
    }
});

/**
 * Setup the server and initialise the modules
 */
var server = app.listen(3000, function () {
    console.log('Web server is ready.');
});

/**
 * Set the application core
 */
app.core = new Core(server, dashboardSocket);
