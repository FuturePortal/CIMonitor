const fileSystem = require('fs');
const path = require('path');

class Config {
    constructor() {
        this.triggers = [];
        this.events = [];
        this.modules = [];

        this.loadConfig();
    }

    loadConfig() {
        let config;
        const configFile = path.resolve(`${__dirname}/config.json`);
        console.log(`[Config] Loading config from ${configFile}...`);

        fileSystem.readFile(configFile, 'utf8', this.parseConfigFile.bind(this));
    }

    parseConfigFile(error, configJsonString) {
        if (error) {
            console.log('[Config] Could not read the config file.');
            return;
        }

        const config = JSON.parse(configJsonString);

        // @todo: validation via promises
        this.triggers = config.triggers;
        this.events = config.events;
        this.modules = config.modules;

        console.log('[Config] Config is load.');
    }

    getTriggers() {
        return this.triggers;
    }

    getEventByName(eventName) {
        return this.events.find(event => event.name === eventName);
    }

    getModules() {
        return this.modules;
    }
}

module.exports = new Config();
