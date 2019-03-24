const AbstractLoader = require('./loader/AbstractLoader');

class LoaderFactory {
    constructor() {
        this.loader = undefined;
    }

    getLoader() {
        if (this.loader instanceof AbstractLoader) {
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

module.exports = new LoaderFactory();
