const AbstractModule = require('./AbstractModule');
const DashboardSocketConnectionManager = require('../dashboard/SocketConnectionManager');

class DashboardVideo extends AbstractModule {
    fireEvent(config) {
        console.log(`[DashboardVideo] Sending video details ${JSON.stringify(config)} to the dashboard.`);
        DashboardSocketConnectionManager.pushVideo(config);
    }
}

module.exports = DashboardVideo;
