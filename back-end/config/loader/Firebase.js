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

            /**
             * Firebase always returns an object, even if we stored an array. To get back to
             * the original data structure we check in the config stub above if we want an
             * array or an object for each key, and if necessary convert the object.
             */
            Object.keys(data).map(e => {
                if (Array.isArray(config[e])) {
                    config[e] = Object.values(data[e]);
                } else {
                    config[e] = data[e];
                }
            });

            return config;
        });
    }
}

module.exports = new Firebase();
