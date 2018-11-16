class AbstractModule {
    constructor(config) {
        this.config = config;

        this.init();
    }

    init() {
        console.log('[AbstractModule] Empty init.');
    }

    fireEvent(config) {
        console.log('[AbstractModule] No fire event defined.');
    }
}

module.exports = AbstractModule;
