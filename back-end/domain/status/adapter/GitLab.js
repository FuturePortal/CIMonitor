const StatusFactory = require('../StatusFactory');
const StatusManager = require('../StatusManager');
const Config = require('../../../config/Config');

class StatusAdapterGitLab {
    processWebHook(data) {
        switch (data.object_kind) {
            case 'pipeline':
                return this.processPipelineEvent(data);
            case 'build':
                return this.processBuildEvent(data);
            default:
                return Promise.resolve('unprocessable-webhook-kind');
        }
    }

    processPipelineEvent(data) {
        console.log('[StatusAdapterGitLab] Processing pipeline into a status...');
        const key = this.getKeyFromPipeline(data);
        let jobs = [];

        // Use previous jobs if not pending, indicating a new/fresh pipeline
        if (data.object_attributes.status !== 'pending') {
            const existingStatus = StatusManager.getStatusByKey(key);
            if (existingStatus) {
                jobs = existingStatus.getJobs();
            }
        }

        return StatusFactory.createStatus({
            key,
            state: this.pipelineStatusToState(data.object_attributes.status),
            title: data.project.path_with_namespace,
            subTitle: data.object_attributes.ref,
            image: this.getProjectAvatar(data),
            userImage: data.user.avatar_url,
            stages: data.object_attributes.stages,
            jobs,
        });
    }

    processBuildEvent(data) {
        const key = this.getKeyFromBuild(data);

        // no one cares about created ¯\_(ツ)_/¯
        if (data.build_status === 'created') {
            console.log(`[StatusAdapterGitLab] Ignoring build created.`);
            return Promise.resolve('ignore');
        }

        // Check if status key already exists, if not, ¯\_(ツ)_/¯
        let status = StatusManager.getStatusByKey(key);
        if (!status) {
            console.log(`[StatusAdapterGitLab] Received build details for a pipeline that doesn't exist yet.`);
            return Promise.resolve('ignore');
        }

        console.log('[StatusAdapterGitLab] Updating status with new build details...');
        status = StatusFactory.updateJob(status, {
            name: data.build_name,
            stage: data.build_stage,
            state: this.buildStatusToState(data.build_status, data.build_allow_failure),
        });
        return StatusFactory.createStatus(status.getRawData());
    }

    getProjectAvatar(data) {
        const personalAccessToken = Config.getPersonalAccessTokenGitLab();

        if (personalAccessToken) {
            return `${data.project.avatar_url}?private_token=${personalAccessToken}`;
        }

        return data.project.avatar_url;
    }

    getKeyFromPipeline(data) {
        return `gitlab-${data.project.id}-${data.object_attributes.ref}`.replace(/[^\d\w-]/g, '-');
    }

    getKeyFromBuild(data) {
        return `gitlab-${data.project_id}-${data.ref}`.replace(/[^\d\w-]/g, '-');
    }

    pipelineStatusToState(status) {
        switch (status) {
            case 'running':
            case 'pending':
                return 'warning';
            case 'failed':
                return 'error';
            case 'success':
                return 'success';
            default:
                return 'info';
        }
    }

    buildStatusToState(status, isFailureAllowed = false) {
        switch (status) {
            case 'pending':
            case 'created':
                return 'pending';
            case 'running':
                return 'running';
            case 'failed':
                return isFailureAllowed ? 'warning' : 'error';
            case 'success':
                return 'success';
            default:
                return 'info';
        }
    }
}

module.exports = new StatusAdapterGitLab();
