const app = (module.exports = require('express')());
const EventTrigger = require('../domain/event/EventTrigger.js');
const Config = require('../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

app.post('/', (request, response) => {
    console.log('/event [POST]');

    const eventName = request.body.event;

    if (!eventName) {
        return response.status(422).json({
            message: `Missing required field "event".`,
        });
    }

    if (Config.getEventByName(eventName)) {
        EventTrigger.fireModulesForEvent(eventName, null);

        return response.json({
            message: 'Event has been triggered!',
        });
    }

    return response.status(404).json({
        message: `The given event name "${eventName}" is not found.`,
    });
});
