class AbstractConfigLoader {
    constructor() {
        this.config = undefined;
    }

    async loadConfig() {
        throw new Error('Implement loadConfig()');
    }

    getConfig() {
        return this.config;
    }

    setConfigDefaults(config) {
        if (this.isNotAnObject(config)) {
            throw new Error('Loaded config is not an object');
        }

        if (this.isNotanArray(config.triggers)) {
            config.triggers = [];
        }

        if (this.isNotanArray(config.events)) {
            config.events = [];
        }

        if (this.isNotanArray(config.modules)) {
            config.modules = [];
        }
    }

    validateConfig(config) {
        if (this.isNotAnObject(config)) {
            throw new Error('Loaded config is not an object');
        }

        if (this.isNotanArray(config.triggers)) {
            throw new Error('Loaded config section invalid: triggers');
        }

        if (this.isNotanArray(config.events)) {
            throw new Error('Loaded config section invalid: events');
        }

        if (this.isNotanArray(config.modules)) {
            throw new Error('Loaded config section invalid: modules');
        }

        if (this.isNotAnObject(config.server)) {
            throw new Error('Loaded config section invalid: server');
        }

        if (this.isNotAnObject(config.moduleClient)) {
            throw new Error('Loaded config section invalid: moduleClient');
        }
    }

    isNotAnObject(value) {
        return typeof value !== 'object' || value === null || Array.isArray(value);
    }

    isNotanArray(value) {
        return !Array.isArray(value);
    }
}

module.exports = AbstractConfigLoader;
