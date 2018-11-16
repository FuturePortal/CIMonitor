class AbstractModule {
    constructor(config) {
        this.config = config;

        this.init();
    }

    init() {
        // Empty init
    }

    /**
     * @param {Status} status
     */
    fireEvent(config, status) {
        console.log('[AbstractModule] No fire event defined.');
    }
}

module.exports = AbstractModule;
