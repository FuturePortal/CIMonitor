class AbstractLoader {
    constructor() {
        this.config = undefined;
    }

    async loadConfig() {
        throw new Error('Implement loadConfig()');
    }

    getConfig() {
        return this.config;
    }
}

module.exports = AbstractLoader;
