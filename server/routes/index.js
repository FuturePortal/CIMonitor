const app = (module.exports = require('express')());

app.use('/', require('./dashboard'));
app.use('/status', require('./status'));
app.use('/webhook', require('./webhook'));
app.use('/debug', require('./debug'));
app.use('/contributors', require('./contributors'));
