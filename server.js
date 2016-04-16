var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * @type [] of statuses
 */
app.statuses = [{ test: 'test' }];

/**
 * Serve static files from /public
 */
app.use(express.static(__dirname + '/public'));

/**
 * GET /
 *
 * Loads the dashboard
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
    console.log('The dashboard is load.');
});

/**
 * GET /statuses
 *
 * Get the array of statuses that are shown in the board
 */
app.get('/statuses', function (req, res) {
    res.send(JSON.stringify(app.statuses));
    console.log('/statuses was requested and provided.');
});

/**
 * POST /status
 *
 * Provide a new status for the monitor to process and display
 */
app.post('/status', function (req, res, content) {
    console.log('Incomming status: ' + content);
});

/**
 * Setup the server and initialise the modules
 */
var server = app.listen(3000, function () {
    console.log('===================');
    console.log('    CI Monitor');
    console.log('===================');
    console.log('Initialising modules...');

    // @todo: init modules/listeners

    console.log('Load and ready, sir.');
});

/**
 * Connects the dashboard via a socket
 */
var socket  = io.listen(server);
socket.on('connection', function(socket){
    console.log('[Dashboard] connected.');
});
