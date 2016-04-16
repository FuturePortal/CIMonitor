var express = require('express');
var app = express();

app.statuses = [{ test: 'test' }];

app.get('/', function (req, res) {
    res.send('<html><head><title>CI Monitor</title></head><body>~ CI Monitor ~</body></html>');
});

app.get('/statuses', function (req, res) {
    res.send(JSON.stringify(app.statuses));
    console.log('/statuses was requested and provided.');
});

app.post('/status', function (req, res, content) {
    console.log('Incomming status: ' + content);
});

/**
 * Setup the server and initialise the modules
 */
app.listen(3000, function () {
    console.log('============');
    console.log(' CI Monitor');
    console.log('============');
    console.log('Initialising modules...');

    // @todo: init modules/listeners

    console.log('Load and ready, sir.');
});
