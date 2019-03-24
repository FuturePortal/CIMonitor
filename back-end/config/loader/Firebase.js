const AbstractLoader = require('./AbstractLoader');
const Firebase = require('../../storage/Firebase');

class Config extends AbstractLoader {
    async loadConfig() {
        console.log('[Config] Loading config from Firebase...');

        try {
            const config = await this.loadConfigFromFirebase();

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

    async loadConfigFromFirebase() {
        return await Firebase.load('config').then(function(data) {
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
                data.server = [];
            }
            if (typeof data.moduleClient === 'undefined') {
                data.moduleClient = [];
            }
            return data;
        });
    }
}

module.exports = new Config();
