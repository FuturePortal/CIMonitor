const app = (module.exports = require('express')());
const EventTrigger = require('../domain/event/EventTrigger.js');
const ModuleManager = require('../domain/module/ModuleManager');
const Config = require('../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

app.post('/event', (request, response) => {
    console.log('/trigger/event [POST]');

    const eventName = request.body.event;

    if (!eventName) {
        return response.status(422).json({
            message: `To trigger an event the field "event" is required.`,
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

app.post('/module', (request, response) => {
    console.log('/trigger/module [POST]');
    const moduleName = request.body.name;
    const pushConfig = request.body.push;

    if (!moduleName || !pushConfig) {
        return response.status(422).json({
            message: `To trigger a module the fields "name" and "push" are required.`,
        });
    }

    if (ModuleManager.isModuleInitialized(moduleName)) {
        ModuleManager.fireModuleEvent(moduleName, pushConfig, null);
        return response.json({
            message: 'Module has been triggered!',
        });
    }

    return response.status(404).json({
        message: `The given module with name "${moduleName}" doesn't exist or isn't initialized.`,
    });
});
