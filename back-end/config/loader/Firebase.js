const AbstractConfigLoader = require('./AbstractConfigLoader');
const Config = require('../Config');
const FirebaseStorage = require('../../storage/Firebase');

class Firebase extends AbstractConfigLoader {
    async loadConfig() {
        console.log('[Config] Loading config from Firebase...');

        try {
            const config = await FirebaseStorage.load('config');

            config.triggers = config.triggers || [];
            config.events = config.events || [];
            config.modules = config.modules || [];

            this.validateConfig(config);

            this.config = new Config(
                config.triggers,
                config.events,
                config.modules,
                config.server,
                config.moduleClient
            );

            console.log('[Config] Loaded config.');
        } catch (error) {
            console.error('[Config] Unable to load config. ' + error.toString());
            process.exit(1);
        }
    }
}

module.exports = new Firebase();
