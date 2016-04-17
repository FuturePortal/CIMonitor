var StatusManager = require('./status-manager');
var DashboardProvider = require('./dashboard-provider');
var Events = require('events');

/**
 * Core
 *
 * @param {http} httpServer
 * @param {Server} dashboardSocket
 * @constructor
 */
var Core = function(httpServer, dashboardSocket) {
    console.log('===================');
    console.log('    CI Monitor');
    console.log('===================');
    console.log('Loading all modules...');

    this.eventHandler = new Events.EventEmitter();

    this.statusManager = new StatusManager(this.eventHandler);

    new DashboardProvider(httpServer, dashboardSocket, this.eventHandler, this.statusManager);

    // @todo: Load all configured modules with a eventHandler and a statusManager

    console.log('Init completed.');
};

/**
 * Handles a incoming bundle status
 *
 * @param {object} data
 * @returns {boolean}
 */
Core.prototype.handleStatus = function(data) {
    console.log('New status: '  + JSON.stringify(data));

    this.statusManager.newStatus(data);

    return true;
};

module.exports = Core;
