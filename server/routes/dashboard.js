const express = require('express');
const app = (module.exports = express());
const path = require('path');

// Listen to all the statically generated files
app.use(express.static('dist'));

// When directly opening the applications index, show the dashboard
app.get('/', (request, response) => {
    console.log('/ [GET]');

    return response.sendFile(path.resolve(__dirname + '/../../client/index.html'));
});
