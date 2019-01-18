const StatusFactory = require('../StatusFactory');
const gravatar = require('gravatar');

class StatusAdapterDeployer {
    processWebHook(data) {
        data = JSON.parse(data);
        var statuses = ['info', 'warning', 'error', 'success'];

        // Do not process unknown statuses
        if (!statuses.includes(data.state)) {
            return Promise.resolve('unknown-status');
        }

        return StatusFactory.createStatus({
            key: this.getKeyFromData(data),
            state: data.state,
            title: data.title,
            subTitle: data.branch,
            stages: data.stages,
            jobs: data.jobs,
            userImage: gravatar.url(data.user.email, null, true),
        });
    }

    getKeyFromData(data) {
        return `deployer-${data.title}-${data.branch}-${data.user.name}`.replace(/[^\w-]/g, '-');
    }
}

module.exports = new StatusAdapterDeployer();
