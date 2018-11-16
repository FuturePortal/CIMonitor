const app = (module.exports = require('express')());

app.use('/', require('./dashboard'));
app.use('/status', require('./status'));
app.use('/gitlab', require('./gitlab'));
app.use('/debug', require('./debug'));
