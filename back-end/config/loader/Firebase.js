const AbstractLoader = require('./AbstractLoader');
const Config = require('../Config');
const FirebaseStorage = require('../../storage/Firebase');

class Firebase extends AbstractLoader {
    async loadConfig() {
        console.log('[Config] Loading config from Firebase...');

        try {
            const config = await this.loadConfigFromFirebase();

            this.config = new Config(
                config.triggers,
                config.events,
                config.modules,
                config.server,
                config.moduleClient,
            );

            console.log('[Config] Loaded config.');
        } catch (error) {
            console.error('[Config] Unable to load config.');
            process.exit(1);
        }
    }

    async loadConfigFromFirebase() {
        return await FirebaseStorage.load('config').then(function(data) {
            data = data.toJSON();
            if (typeof data.triggers === 'undefined') {
                data.triggers = [];
            }
            if (typeof data.events === 'undefined') {
                data.events = [];
            }
            if (typeof data.modules === 'undefined') {
                data.modules = [];
            }
            if (typeof data.server === 'undefined') {
                data.server = {};
            }
            if (typeof data.moduleClient === 'undefined') {
                data.moduleClient = {};
            }
            return data;
        });
    }
}

module.exports = new Firebase();
