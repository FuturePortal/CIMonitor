var StatusManager = require('./StatusManager');
var DashboardProvider = require('./DashboardProvider');
var Events = require('events');
var FileSystem = require('fs');

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

    this.config = JSON.parse(FileSystem.readFileSync(__dirname + '/../Config/config.json'));

    this.modules = this.loadStatusModules();

    console.log('Init completed.');
};

/**
 * Load all status modules and attach them to the status listener
 */
Core.prototype.loadStatusModules = function() {
    var Core = this;

    console.log('Loading status modules...');

    for (var module in this.config.statusModules) {
        var StatusModule = new (require('./../StatusModule/' + module))(this.config.statusModules[module]);

        // Prepare for some fucked-up javascript scope
        (function(StatusModule){
            Core.eventHandler.on('status', function(status) {
                StatusModule.handleStatus(status);
            })
        })(StatusModule);
    }
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
