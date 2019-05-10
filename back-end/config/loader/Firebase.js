const AbstractConfigLoader = require('./AbstractConfigLoader');
const Config = require('../Config');
const FirebaseStorage = require('../../storage/Firebase');

class Firebase extends AbstractConfigLoader {
    async loadConfig() {
        console.log('[Config] Loading config from Firebase...');

        try {
            const config = await this.loadConfigFromFirebase();

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

    async loadConfigFromFirebase() {
        return await FirebaseStorage.load('config').then(firebaseConfig => {
            let config = {
                triggers: [],
                events: [],
                modules: [],
                server: {},
                moduleClient: {},
            };
            firebaseConfig = firebaseConfig.toJSON();

            /**
             * Firebase always returns an object, even if we stored an array. To get back to
             * the original data structure we check in the config stub above if we want an
             * array or an object for each key, and if necessary convert the object.
             */
            Object.keys(firebaseConfig).forEach(key => {
                if (Array.isArray(config[key])) {
                    config[key] = Object.values(firebaseConfig[key]);
                    return;
                }
                config[key] = firebaseConfig[key];
            });

            return config;
        });
    }
}

module.exports = new Firebase();
