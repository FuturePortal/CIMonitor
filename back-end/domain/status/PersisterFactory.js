const AbstractPersister = require('./persister/AbstractPersister');

class PersisterFactory {
    constructor() {
        this.persister = undefined;
    }

    getPersister() {
        if (this.persister instanceof AbstractPersister) {
            return this.persister;
        }

        switch (process.env.STORAGE) {
            case 'firebase':
                this.persister = require('./persister/Firebase');
                break;
            case 'local':
            default:
                this.persister = require('./persister/Filesystem');
                break;
        }

        return this.persister;
    }
}

module.exports = new PersisterFactory();
