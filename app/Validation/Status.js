module.exports = {
    whitelist: {
        project: true,
        status: true,
        branch: true,
        type: true,
        note: true
    },
    rules: {
        project: {
            presence: {
                message: 'is required.'
            }
        },
        status: {
            presence: {
                message: 'is required with either started, success, or failure.'
            },
            inclusion: {
                within: [
                    'started',
                    'success',
                    'failure'
                ],
                message: 'may only be started, success, or failure.'
            }
        },
        branch: {
            presence: {
                message: 'is required.'
            }
        },
        type: {
            presence: {
                message: 'is required with either test or deploy.'
            },
            inclusion: {
                within: [
                    'test',
                    'deploy'
                ],
                message: 'may only be test, or deploy.'
            }
        }
    }
};
