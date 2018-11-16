const AbstractModule = require('./AbstractModule');

class DashboardVideo extends AbstractModule {
    init() {
        console.log('[DashboardVideo] Hai!!!');
    }

    fireEvent(config) {
        console.log(`[DashboardVideo] FIREERE! ${JSON.stringify(config)}`);
    }
}

module.exports = DashboardVideo;
