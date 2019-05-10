const AbstractConfigLoader = require('./loader/AbstractConfigLoader');

class ConfigLoaderFactory {
    constructor() {
        this.loader = undefined;
    }

    getLoader() {
        if (this.loader instanceof AbstractConfigLoader) {
            return this.loader;
        }

        switch (process.env.STORAGE) {
            case 'firebase':
                this.loader = require('./loader/Firebase');
                break;
            case 'local':
            default:
                this.loader = require('./loader/Filesystem');
                break;
        }

        return this.loader;
    }
}

module.exports = new ConfigLoaderFactory();
