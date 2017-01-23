/**
 * @constructor
 * @param statusManager
 */
var GitLab = function(statusManager) {
    /** {StatusManager} */
    this.statusManager = statusManager;

    this.init();
};

/**
 * Add the status listener
 */
GitLab.prototype.init = function() {
    console.log('[GitLab] Ready to process GitLab events.');
};

GitLab.prototype.processEvent = function(event) {
    console.log('[GitLab] Translating GitLab event...');

    switch(event.object_kind) {
        case 'build':
            this.handleBuild(event);
            break;
        case 'pipeline':
            this.handlePipeline(event);
            break;
    }
};

GitLab.prototype.translateStatus = function(status) {
    var ciMonitorStatus = 'success';

    switch(status) {
        case 'created':
        case 'pending':
        case 'running':
            ciMonitorStatus = 'started';
            break;
        case 'failed':
            ciMonitorStatus = 'failure';
            break;
    }

    return ciMonitorStatus;
};

GitLab.prototype.handleBuild = function(event) {
    var status = {
        project: event.repository.name,
        branch: event.ref + ' ' + event.build_name,
        type: event.build_name.substring(0, 6) === 'deploy' ? 'deploy' : 'test',
        status: this.translateStatus(event.build_status),
        note: event.build_status
    };

    return this.statusManager.newStatus(status);
};

GitLab.prototype.handlePipeline = function(event) {
    var status = {
        project: event.project.name,
        branch: event.object_attributes.ref,
        type: 'pipeline',
        status: this.translateStatus(event.object_attributes.status),
        note: 'Pipeline triggered by ' + event.user.name
    };

    return this.statusManager.newStatus(status);
};

module.exports = GitLab;
