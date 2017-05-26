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
    console.log('[GitLab] ' + JSON.stringify(data));

    switch(data.object_kind) {
        case 'build':
            return this.handleBuild(data);
        case 'pipeline':
            return this.handlePipeline(data);
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

GitLab.prototype.determineType = function(buildName) {
    if (buildName.substring(0, 6) === 'deploy') {
        return 'deploy';
    }

    if (buildName.substring(0, 5) === 'build') {
        return 'build';
    }

    return 'test';
};

GitLab.prototype.handleBuild = function(data) {
    // Not acting upon the created status
    if (data.build_status === 'created') {
        return;
    }

    // data.build_name

    var job = {
        // type: this.determineType(data.build_name),
        // status: this.translateStatus(data.build_status),
        // note: data.build_status
    };

    var pipeline = {
        project: data.repository.name,
        branch: data.ref,
    };

    return this.statusManager.newJob(job, pipeline);
};

GitLab.prototype.handlePipeline = function(data) {
    var pipeline = {
        project: data.project.name,
        branch: data.object_attributes.ref,
        type: 'wait',
        status: this.translateStatus(data.object_attributes.status),
    };

    var stages = data.object_attributes.stages;
    pipeline.stages = [];
    for (var stageKey in stages) {
        pipeline.stages.push({
            name: stages[stageKey],
            status: 'todo'
        });
    }

    return this.statusManager.newPipeline(pipeline);
};

module.exports = GitLab;
