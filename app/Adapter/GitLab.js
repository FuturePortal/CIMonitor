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

GitLab.prototype.handleBuild = function(data) {
    // Not acting upon the created status
    if (data.build_status === 'created') {
        return;
    }

    var job = {
        name: data.build_name,
        stage: data.build_stage,
        status: this.translateStatus(data.build_status),
    };

    var pipeline = {
        project: data.repository.name,
        branch: data.ref,
    };

    return this.statusManager.newJob(job, pipeline);
};

GitLab.prototype.handleNewPipeline = function(data) {
    var pipeline = {
        project: data.project.name,
        branch: data.object_attributes.ref,
        type: 'wait',
        status: this.translateStatus(data.object_attributes.status),
        photo: data.user.avatar_url
    };

    var stages = data.object_attributes.stages;
    pipeline.stages = {};
    pipeline.jobs = {};
    for (var stageKey in stages) {
        pipeline.stages[stages[stageKey]] = {
            name: stages[stageKey],
            status: 'todo'
        };
    }

    return this.statusManager.newPipeline(pipeline);
};

GitLab.prototype.handlePipeline = function(data) {
    if (data.object_attributes.status === 'pending') {
        return this.handleNewPipeline(data);
    }

    return this.statusManager.updatePipeline({
        project: data.project.name,
        branch: data.object_attributes.ref,
        status: this.translateStatus(data.object_attributes.status),
    });
};

module.exports = GitLab;
