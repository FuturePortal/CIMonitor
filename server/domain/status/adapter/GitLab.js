const StatusFactory = require('../StatusFactory');
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

        StatusFactory.createStatus({
            key,
            state: this.pipelineStatusToState(data.object_attributes.status),
            title: data.project.path_with_namespace,
            subTitle: data.object_attributes.ref,
            // image: data.project.avatar_url, leaving out for now as the image is not shown when not logged in
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
        let status = StatusManager.getStatusByKey(key);
        if (!status) {
            console.log(`[StatusAdapterGitLab] Received build details for a pipeline that doesn't exist yet.`);
            return;
        }

        console.log('[StatusAdapterGitLab] Updating status with new build details...');
        status = StatusFactory.updateJob(status, {
            name: data.build_name,
            stage: data.build_stage,
            state: this.buildStatusToState(data.build_status),
        });
        StatusFactory.createStatus(status.getRawData());
    }

    getKeyFromPipeline(data) {
        return `gitlab-${data.project.id}-${data.object_attributes.ref}`.replace(/[^\d\w-]/g, '-');
    }

    getKeyFromBuild(data) {
        return `gitlab-${data.project_id}-${data.ref}`.replace(/[^\d\w-]/g, '-');
    }

    pipelineStatusToState(status) {
        if (status === 'running' || status === 'pending') {
            return 'warning';
        }

        if (status === 'failed') {
            return 'error';
        }

        if (status === 'success') {
            return 'success';
        }

        return 'info';
    }

    buildStatusToState(status) {
        if (status === 'pending' || status === 'created') {
            return 'pending';
        }

        if (status === 'running') {
            return 'running';
        }

        if (status === 'failed') {
            return 'error';
        }

        if (status === 'success') {
            return 'success';
        }

        return 'info';
    }
}

module.exports = new StatusAdapterGitLab();
