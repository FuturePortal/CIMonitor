class AbstractConfigLoader {
    constructor() {
        this.config = undefined;
    }

    async loadConfig() {
        throw new Error('Implement loadConfig()');
    }

    validateConfig(config) {
        console.log(typeof config);
        if (typeof config !== 'object' || config === null) {
            throw new Error('Loaded config is not an object');
        }

        if (!('triggers' in config) || !Array.isArray(config.triggers)) {
            throw new Error('Loaded config section invalid: triggers');
        }

        if (!('events' in config) || !Array.isArray(config.events)) {
            throw new Error('Loaded config section invalid: events');
        }

        if (!('modules' in config) || !Array.isArray(config.modules)) {
            throw new Error('Loaded config section invalid: modules');
        }

        if (
            !('server' in config) ||
            Array.isArray(config.server) ||
            typeof config.server !== 'object' ||
            config.server === null
        ) {
            throw new Error('Loaded config section invalid: server');
        }

        if (
            !('moduleClient' in config) ||
            Array.isArray(config.moduleClient) ||
            typeof config.moduleClient !== 'object' ||
            config.moduleClient === null
        ) {
            throw new Error('Loaded config section invalid: moduleClient');
        }
    }

    getConfig() {
        return this.config;
    }
}

module.exports = AbstractConfigLoader;
