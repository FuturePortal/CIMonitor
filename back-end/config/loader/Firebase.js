const AbstractConfigLoader = require('./AbstractConfigLoader');
const Config = require('../Config');
const FirebaseStorage = require('../../storage/Firebase');

class Firebase extends AbstractConfigLoader {
    async loadConfig() {
        console.log('[Config] Loading config from Firebase...');

        try {
            const config = await this.loadConfigFromFirebase();

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

    async loadConfigFromFirebase() {
        return await FirebaseStorage.load('config').then(data => {
            let config = {
                triggers: [],
                events: [],
                modules: [],
                server: {},
                moduleClient: {},
            };
            data = data.toJSON();

            Object.keys(data).map(e => (config[e] = data[e]));

            return config;
        });
    }
}

module.exports = new Firebase();
