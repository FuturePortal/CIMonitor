const app = (module.exports = require('express')());
const VersionChecker = require('../domain/cimonitor/VersionChecker');

app.use('/', require('./dashboard'));
app.use('/status', require('./status'));
app.use('/webhook', require('./webhook'));
app.use('/debug', require('./debug'));
app.use('/contributors', require('./contributors'));

app.get('/version', (request, response) => {
    console.log('/version [GET]');

    response.json({
        message: 'Showing running CIMonitor server version.',
        version: VersionChecker.getCurrentVersion(),
    });
});
