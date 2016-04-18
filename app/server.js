var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var Core = require('./Core/Core');
var dashboardSocket = require('socket.io')(http);

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
    response.sendStatus(app.core.handleStatus(request.body) ? 200 : 422);
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
