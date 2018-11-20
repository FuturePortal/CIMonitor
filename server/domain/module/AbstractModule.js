class AbstractModule {
    constructor(config) {
        this.config = config;

        this.init();
    }

    init() {
        // Empty init, override this function if needed
    }

    /**
     * @param {Status} status
     */
    fireEvent(config, status) {
        // Empty fire event, override this function if needed
    }
}

module.exports = AbstractModule;
