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
    console.log('[Core] Loading all modules...');

    this.eventHandler = new Events.EventEmitter();

    this.statusManager = new StatusManager(this.eventHandler);

    new DashboardProvider(httpServer, dashboardSocket, this.eventHandler, this.statusManager);

    this.config = JSON.parse(FileSystem.readFileSync(__dirname + '/../Config/config.json'));

    this.modules = this.loadStatusModules();

    console.log('[Core] Init completed.');
};

/**
 * Load all status modules and attach them to the status listener
 */
Core.prototype.loadStatusModules = function() {
    var Core = this;

    console.log('[Core] Loading status modules...');

    for (var module in this.config.statusModules) {
        var ModuleClass = require('./../StatusModule/' + module);
        var StatusModule = new ModuleClass(this.config.statusModules[module], this.statusManager);

        // Prepare for some fucked-up javascript scope
        (function(StatusModule){
            Core.eventHandler.on('status', function(status) {
                StatusModule.handleStatus(status);
            })
        })(StatusModule);
    }
};

/**
 * Handles an incoming CI status
 *
 * @param {object} data
 * @returns {boolean}
 */
Core.prototype.handleStatus = function(data) {
    return this.statusManager.newStatus(data);
};

/**
 * Figure buildStatus form the jenkins callback
 *
 * @param {object} data
 * @returns {string}
 */
Core.prototype.getStatusFromJenkinsCallback = function(data) {
    if (data.build.phase.toLowerCase() === 'started') {
        return 'started';
    }

    var buildStatus = data.build.status.toLowerCase();
    var failureStatuses = ['unstable', 'failure', 'aborted'];
    if (failureStatuses.indexOf(buildStatus) >= 0) {
        return 'failure';
    }

    if (buildStatus === 'success') {
        return 'success';
    }

    // Unknown status, assume failure
    return 'failure';
};

/**
 * Handles an incoming jenkins status
 *
 * @param {object} data
 * @returns {boolean}
 */
Core.prototype.handleJenkinsStatus = function(data) {
    var buildStatus = 'started';

    var status = {
        project: data.name,
        branch: data.build.scm.branch,
        type: 'test',
        status: this.getStatusFromJenkinsCallback(data)
    };

    return this.statusManager.newStatus(status);
};

module.exports = Core;
