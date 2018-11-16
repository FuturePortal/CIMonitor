const Status = require('../Status');
const StatusManager = require('../StatusManager');
const { parse } = require('querystring');
const gravatar = require('gravatar');

class StatusAdapterTravisCI {
    processWebHook(data) {
        data = JSON.parse(data);

        // Do not process pull requests
        if (data.type === 'pull_request') {
            return;
        }

        Status.createStatus({
            key: data.id.toString(),
            state: this.pipelineStatusToState(data.status_message),
            title: data.repository.owner_name + '/' + data.repository.name,
            subTitle: data.branch,
            userImage: gravatar.url(data.committer_email, { size: '200' }, true),
        });
    }

    pipelineStatusToState(status) {
        switch (status) {
            case 'Pending':
                return 'warning';
            case 'Passed':
            case 'Fixed':
                return 'success';
            case 'Broken':
            case 'Failed':
            case 'Still Failing':
            case 'Error':
                return 'error';
            case 'Canceled':
            default:
                return 'info';
        }
    }
}

module.exports = new StatusAdapterTravisCI();
