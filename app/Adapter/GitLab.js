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

GitLab.prototype.processEvent = function(data) {
    console.log('[GitLab] Translating GitLab event...');

    switch(data.object_kind) {
        case 'build':
            this.handleBuild(data);
            break;
        case 'pipeline':
            this.handlePipeline(data);
            break;
    }
};

GitLab.prototype.translateStatus = function(status) {
    var ciMonitorStatus = 'success';

    switch(status) {
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

GitLab.prototype.handleBuild = function(data) {
    if (data.build_status === 'created') {
        return;
    }

    var status = {
        project: data.repository.name,
        branch: data.ref + ' ' + data.build_name,
        type: data.build_name.substring(0, 6) === 'deploy' ? 'deploy' : 'test',
        status: this.translateStatus(data.build_status),
        note: data.build_status
    };

    return this.statusManager.newStatus(status);
};

GitLab.prototype.handlePipeline = function(data) {
    var status = {
        project: data.project.name,
        branch: data.object_attributes.ref,
        type: 'pipeline',
        status: this.translateStatus(data.object_attributes.status),
        note: 'Pipeline triggered by ' + data.user.name
    };

    return this.statusManager.newStatus(status);
};

module.exports = GitLab;
