var fileSystem = require('fs');
var MARK_STARTED_FAILED_TIME = 60000 * 30;

/**
 * @param {EventEmitter} eventHandler
 * @param {int} cleanUpAfterDays
 * @constructor
 */
var StatusManager = function(eventHandler, cleanUpAfterDays) {
    /** @type {EventEmitter} */
    this.eventHandler = eventHandler;

    /** @type {int} */
    this.cleanUpAfterDays = cleanUpAfterDays;

    /** @type {{}} */
    this.statuses = {};

    this.statusesFile = './statuses.json';

    this.init();
};

/**
 * Initialise the StatusManager
 * Loads the saved statuses and attaches a status listener to save status updates
 */
StatusManager.prototype.init = function() {
    var StatusManager = this;

    this.loadStatuses();

    this.eventHandler.on('status', function(status) {
        console.log('[StatusManager] New status: ' + JSON.stringify(status));

        StatusManager.saveStatuses();
    });
};

/**
 * Save the statues to a json file, so that no status will be list when the app restarts
 */
StatusManager.prototype.saveStatuses = function() {
    var statusesJson = JSON.stringify(this.statuses);

    fileSystem.writeFile(this.statusesFile, statusesJson, function (error) {
        if (error) {
            console.log('[StatusManager] There has been an error saving your configuration data.');
            console.log('[StatusManager] ' + error.message);
            return;
        }
        console.log('[StatusManager] Stored the statuses in a json file.');
    });
};

/**
 * Load all statuses that have been saved previously
 */
StatusManager.prototype.loadStatuses = function() {
    try {
        var statuses = fileSystem.readFileSync(this.statusesFile);
        this.statuses = JSON.parse(statuses);
        console.log('[StatusManager] Statuses have been load from a previous save.');
    } catch (error) {
        console.log('[StatusManager] There has been an error parsing the saved statuses.');
        console.log('[StatusManager] ' + error);
    }
};

/**
 * Processes a job
 *
 * @param {object} status
 */
StatusManager.prototype.newPipeline = function(pipeline) {
    pipeline.key = this.getSimpleKey(pipeline);
    pipeline.updateTime = new Date().getTime();

    this.statuses[pipeline.key] = pipeline;

    // Fire status event
    this.eventHandler.emit('status', this.buildStatus(
        pipeline.project,
        pipeline.branch,
        'pipeline',
        pipeline.status
    ));

    return true;
};

/**
 * Processes a job
 *
 * @param {object} pipeline
 */
StatusManager.prototype.updatePipeline = function(pipeline) {
    var key = this.getSimpleKey(pipeline);

    if (typeof this.statuses[key] === 'undefined') {
        console.log('[StatusManager] ' + key + ' does not exist yet.');
        return true;
    }

    this.statuses[key].updateTime = new Date().getTime();
    this.statuses[key].status = pipeline.status;

    if (pipeline.status === 'success') {
        this.statuses[key].type = 'success';
    } else if (pipeline.status === 'failure') {
        var failureImages = ['rip-stone', 'pumpkin', 'skull', 'firewall', 'bomb', 'thunder'];
        this.statuses[key].type = failureImages[Math.floor(Math.random() * failureImages.length)];
    }

    // Fire status event
    this.eventHandler.emit('status', this.buildStatus(
        pipeline.project,
        pipeline.branch,
        'pipeline',
        pipeline.status,
        'status'
    ));

    return true;
};

StatusManager.prototype.filterType = function(stage) {
    if (stage.substring(0, 5) === 'build') {
        return 'build';
    }
    if (stage.substring(0, 6) === 'deploy') {
        return 'deploy';
    }
    if (stage.substring(0, 3) === 'tag') {
        return 'tag';
    }
    if (stage.substring(0, 4) === 'prod') {
        return 'deploy';
    }
    return 'test';
};

StatusManager.prototype.determineStageStatus = function(stage, jobs) {
    var hasStarted = false;
    var hasFailure = false;
    var hasAllowedFailure = false;

    for (var jobKey in jobs) {
        if (jobs[jobKey].stage === stage) {
            if (jobs[jobKey].status === 'started') {
                hasStarted = true;
            }
            if (jobs[jobKey].status === 'failure') {
                hasFailure = true;
            }
            if (jobs[jobKey].status === 'allowed-failure') {
                hasAllowedFailure = true;
            }
        }
    }

    if (hasFailure) {
        return 'failure';
    }
    if (hasStarted) {
        return 'started';
    }
    if (hasAllowedFailure) {
        return 'allowed-failure';
    }
    return 'success';
};

/**
 * Processes an incoming status
 */
StatusManager.prototype.newJob = function(job, pipeline) {
    var key = this.getSimpleKey(pipeline);

    if (typeof this.statuses[key] === 'undefined') {
        console.log('[StatusManager] ' + key + ' does not exist yet.');
        return true;
    }

    if (this.statuses[key].currentStage !== job.stage) {
        this.eventHandler.emit('status', this.buildStatus(
            pipeline.project,
            pipeline.branch,
            'stage',
            'started',
            job.stage
        ));
    }

    this.statuses[key].jobs[job.name] = job;
    var stageStatus = this.determineStageStatus(job.stage, this.statuses[key].jobs);
    this.statuses[key].stages[job.stage].status = stageStatus;
    this.statuses[key].type = this.filterType(job.stage);
    this.statuses[key].currentStage = job.stage;
    this.statuses[key].updateTime = new Date().getTime();

    // Fire status events
    this.eventHandler.emit('status', this.buildStatus(
        pipeline.project,
        pipeline.branch,
        'job',
        job.status,
        job.name
    ));
    if (stageStatus === 'success') {
        this.eventHandler.emit('status', this.buildStatus(
            pipeline.project,
            pipeline.branch,
            'stage',
            stageStatus,
            job.stage
        ));
    }

    return true;
};

/**
 * Processes an incoming status
 *
 * @param {object} status
 */
StatusManager.prototype.newStatus = function(status) {
    var StatusManager = this;

    this.removeOldStatuses();

    // Add extra attributes to the status object
    status.key = this.getKey(status);
    status.updateTime = new Date().getTime();
    status.jobs = [{
        name: status.status,
        status: status.status,
    }];

    console.log('[StatusManager] New status for ' + status.key + ': ' + status.status);

    // Add the new/updated status to the statuses
    this.statuses[status.key] = status;

    if (status.status === 'started') {
        setTimeout(function() {
            StatusManager.checkIfStartedFailed();
        }, MARK_STARTED_FAILED_TIME);
    }

    // Fire status event
    this.eventHandler.emit('status', this.buildStatus(
        status.project,
        status.branch,
        'api',
        status.status,
        status.type
    ));

    return true;
};

/**
 * Build a status object for the status modules
 *
 * @param {string} project
 * @param {string} branch
 * @param {string} source api|pipeline|job
 * @param {string} status success|started|failure
 * @param {string} type test|build|deploy|acceptance|tag|production
 */
StatusManager.prototype.buildStatus = function(project, branch, source, status, type) {
    return {
        project: project,
        branch: branch,
        source: source,
        status: status,
        type: type,
    };
};

/**
 * If a started status remains started for longer then 30 minutes, assume it failed.
 */
StatusManager.prototype.checkIfStartedFailed = function() {
    var expiredStartedTime = new Date().getTime() - MARK_STARTED_FAILED_TIME;

    for (var statusKey in this.statuses) {
        var status = this.statuses[statusKey];
        if (status.status === 'started' && status.updateTime <= expiredStartedTime) {
            status.status = 'failure';
            status.updateTime = new Date().getTime();
            this.statuses[statusKey] = status;
            this.eventHandler.emit('status', status);
        }
    }
};

/**
 * Clean up all the old statuses
 */
StatusManager.prototype.removeOldStatuses = function() {
    var allowedStatusDate = new Date().getTime() - 1000 * 60 * 60 * 24 * this.cleanUpAfterDays;

    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].updateTime < allowedStatusDate) {
            console.log(
                '[StatusManager] Removing status ' + this.statuses[statusKey].key
                + ' because it\'s older then ' + this.cleanUpAfterDays + ' days.'
            );
            delete this.statuses[statusKey];
        }
    }
};

/**
 * Get the unique key for a status
 *
 * @param {object} status
 * @returns {string}
 */
StatusManager.prototype.getKey = function(status) {
    return status.project + '.' + status.type + '.' + status.branch;
};

/**
 * Get the unique key for a status
 *
 * @param {object} status
 * @returns {string}
 */
StatusManager.prototype.getSimpleKey = function(status) {
    return status.project + '.' + status.branch;
};

/**
 * Checks if there is a started status between all statuses
 * Because you don't want all lights green when there is still some service running
 *
 * @returns {string}
 */
StatusManager.prototype.hasStartedStatus = function() {
    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].status === 'started') {
            return true;
        }
    }
    return false;
};

/**
 * Checks if there is a started status between all statuses
 * Because you don't want all lights green when there is still some service running
 *
 * @returns {bool}
 */
StatusManager.prototype.hasStatus = function(status) {
    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].status === status) {
            return true;
        }
    }
    return false;
};

/**
 * Checks if there is a started status between all statuses
 *
 * @returns {bool}
 */
StatusManager.prototype.hasStartedStatus = function() {
    return this.hasStatus('started');
};

/**
 * Checks if there is a failed status between all statuses
 *
 * @returns {bool}
 */
StatusManager.prototype.hasFailureStatus = function() {
    return this.hasStatus('failure');
};

/**
 * Return all statuses sorted by update time
 *
 * @returns {Array}
 */
StatusManager.prototype.getStatuses = function() {
    var statuses = [];

    for (var statusKey in this.statuses) {
        statuses.push(this.statuses[statusKey]);
    }

    if (statuses.length === 0) {
        return [];
    }

    statuses.sort(this.sortByUpdateTime);

    return statuses;
};

/**
 * Sorting helper function to sort the status array by the update time
 *
 * @param statusA
 * @param statusB
 * @returns {number}
 */
StatusManager.prototype.sortByUpdateTime = function(statusA, statusB) {
    return statusB.updateTime - statusA.updateTime;
};

module.exports = StatusManager;
