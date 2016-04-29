module.exports = {
    whitelist: {
        name: true,
        'build.number': true,
        'build.phase': true,
        'build.status': true,
        'build.scm.branch': true
    },
    rules: {
        name: {
            presence: {
                message: 'is required.'
            }
        },
        'build.number': {
            presence: {
                message: 'is required.'
            }
        },
        'build.phase': {
            presence: {
                message: 'is required.'
            }
        },
        'build.scm.branch': {
            presence: {
                message: 'is required.'
            }
        }
    }
};
