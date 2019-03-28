const fileSystem = require('fs');
const path = require('path');

const AbstractConfigLoader = require('./AbstractConfigLoader');
const Config = require('../Config');

class Filesystem extends AbstractConfigLoader {
    async loadConfig() {
        console.log('[Config] Loading config from filesystem...');

        try {
            const config = this.loadConfigFromFilesystem();

            this.config = new Config(
                config.triggers,
                config.events,
                config.modules,
                config.server,
                config.moduleClient
            );

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
