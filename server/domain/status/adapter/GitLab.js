const Status = require('../Status');
const StatusManager = require('../StatusManager');

class StatusAdapterGitLab {
    processWebHook(data) {
        switch (data.object_kind) {
            case 'pipeline':
                this.processPipelineEvent(data);
                break;
            case 'build':
                this.processBuildEvent(data);
                break;
        }
    }

    processPipelineEvent(data) {
        console.log('[StatusAdapterGitLab] Processing pipeline into a status...');
        const key = this.getKeyFromPipeline(data);

        Status.createStatus({
            key,
            state: this.pipelineStatusToState(data.object_attributes.status),
            title: data.project.path_with_namespace,
            subTitle: data.object_attributes.ref,
            image: data.project.avatar_url,
            userImage: data.user.avatar_url,
            stages: data.object_attributes.stages,
            jobs: data.builds.map(build => {
                return {
                    name: build.name,
                    stage: build.stage,
                    state: this.buildStatusToState(build.status),
                };
            }),
        });
    }

    processBuildEvent(data) {
        const key = this.getKeyFromBuild(data);

        // no one cares about created ¯\_(ツ)_/¯
        if (data.build_status === 'created') {
            console.log(`[StatusAdapterGitLab] Ignoring build created.`);
            return;
        }

        // Check if status key already exists, if not, ¯\_(ツ)_/¯
        const status = StatusManager.getStatusByKey(key);
        if (!status) {
            console.log(`[StatusAdapterGitLab] Received build details for a pipeline that doesn't exist yet.`);
            return;
        }

        console.log('[StatusAdapterGitLab] Updating status with new build details...');
        status.updateJob({
            name: data.build_name,
            stage: data.build_stage,
            state: this.buildStatusToState(data.build_status, data.build_allow_failure),
        });
        Status.createStatus(status.getRawData());
    }

    getKeyFromPipeline(data) {
        return `gitlab-${data.project.id}-${data.object_attributes.ref}`.replace(/[^\d\w-]/g, '-');
    }

    getKeyFromBuild(data) {
        return `gitlab-${data.project_id}-${data.ref}`.replace(/[^\d\w-]/g, '-');
    }

    pipelineStatusToState(status) {
        if (status === 'pending') {
            return 'info';
        }

        if (status === 'running') {
            return 'warning';
        }

        if (status === 'failed') {
            return 'error';
        }

        return 'success';
    }

    buildStatusToState(status, errorAllowed = false) {
        if (status === 'pending') {
            return 'pending';
        }

        if (status === 'running') {
            return 'running';
        }

        if (status === 'failed') {
            return errorAllowed ? 'allowed-error' : 'error';
        }

        return 'success';
    }
}

module.exports = new StatusAdapterGitLab();
