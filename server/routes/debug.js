const app = (module.exports = require('express')());
const fs = require('fs');
const path = require('path');

app.post('/web-hook', (request, response) => {
    console.log('/debug/web-hook [POST]');

    const now = new Date();
    const filename =
        `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ` +
        `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}.json`;
    const logPath = path.resolve(`${__dirname}/../../logs/`);
    const logFile = `${logPath}/${filename}`;

    if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
    }

    fs.writeFile(logFile, JSON.stringify(request.body), function(error) {
        if (error) {
            return console.log(`[Debug] ${error}`);
        }

        console.log(`[Debug] The web-hook body is written to logs/${filename}.`);
    });

    response.json({
        message: 'Received your web-hook, thank you for your service.',
    });
});
