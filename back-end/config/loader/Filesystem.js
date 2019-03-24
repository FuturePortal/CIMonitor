const fileSystem = require('fs');
const path = require('path');

const AbstractLoader = require('./AbstractLoader');

class Filesystem extends AbstractLoader {
    async loadConfig() {
        console.log('[Config] Loading config from filesystem...');

        try {
            const config = this.loadConfigFromFilesystem();

            this.triggers = config.triggers;
            this.events = config.events;
            this.modules = config.modules;
            this.server = config.server;
            this.moduleClient = config.moduleClient;

            console.log('[Config] Loaded config.');
        } catch (error) {
            console.error('[Config] Unable to load config.');
            process.exit(1);
        }
    }

    loadConfigFromFilesystem() {
        const configFile = path.resolve(`${__dirname}/../../../config/config.json`);
        return JSON.parse(fileSystem.readFileSync(configFile));
    }
}

module.exports = new Filesystem();
