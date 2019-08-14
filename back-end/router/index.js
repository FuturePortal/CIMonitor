const app = (module.exports = require('express')());

app.use(require('./authorization.js'));

app.use('/', require('./route/dashboard.js'));
app.use('/status', require('./route/status.js'));
app.use('/webhook', require('./route/webhook.js'));
app.use('/debug', require('./route/debug.js'));
app.use('/contributors', require('./route/contributors.js'));
app.use('/version', require('./route/version.js'));
app.use('/trigger', require('./route/trigger.js'));
