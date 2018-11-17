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
        const configFile = path.resolve(`${__dirname}/config.json`);
        console.log(`[Config] Loading config from ${configFile}...`);

        const config = JSON.parse(fileSystem.readFileSync(configFile));

        // @todo: validation via promises
        this.triggers = config.triggers;
        this.events = config.events;
        this.modules = config.modules;

        console.log('[Config] loaded.');
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
