const app = (module.exports = require('express')());
const ConnectionManager = require('../domain/socket/ConnectionManager');
const Events = require('../domain/Events.js');

app.post('/event', (request, response) => {
    console.log('/trigger/event [POST]');

    const eventName = request.body.event;

    if (!eventName) {
        return response.status(422).json({
            message: `To trigger an event the field "event" is required.`,
        });
    }

    Events.push(Events.event.triggerEvent, eventName);
    ConnectionManager.pushEventTrigger(eventName);

    return response.json({
        message: 'The event has been triggered and pushed to clients.',
    });
});

app.post('/module', (request, response) => {
    console.log('/trigger/module [POST]');
    const moduleName = request.body.name;
    const pushConfig = request.body.push;

    if (!moduleName || !pushConfig) {
        return response.status(422).json({
            message: `To trigger a module the fields "name" and "push" are required.`,
        });
    }

    Events.push(Events.event.triggerModule, {
        name: moduleName,
        push: pushConfig,
    });
    ConnectionManager.pushModuleTrigger(moduleName, pushConfig);

    return response.json({
        message: 'The module has been triggered and pushed to clients.',
    });
});
