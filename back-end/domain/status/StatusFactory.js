const validate = require('validate.js');

const Events = require('../Events');
const Status = require('./Status');

class StatusFactory {
    static getJobConstraints() {
        return {
            name: {
                presence: true,
            },
            stage: {},
            state: {
                presence: true,
                inclusion: ['info', 'pending', 'running', 'error', 'success', 'warning'],
            },
        };
    }

    static jobsValidator(jobs) {
        // Do not care if not set
        if (!jobs) {
            return;
        }

        if (!validate.isArray(jobs)) {
            return 'Jobs must be an array';
        }

        const errors = [];
        jobs.forEach((job, index) => {
            const validateErrors = validate(job, StatusFactory.getJobConstraints());
            if (validateErrors) {
                errors.push(`job ${index}: ${JSON.stringify(validateErrors)}`);
            }
        });

        return errors.length > 0 ? errors : null;
    }

    static stagesValidator(stages) {
        // Do not care if not set
        if (!stages) {
            return;
        }

        if (!validate.isArray(stages)) {
            return 'Stages must be an array';
        }

        if (stages.find(stage => !validate.isString(stage))) {
            return 'Stages must be an array of strings';
        }
    }

    static getStatusConstraints() {
        validate.validators.jobsValidator = this.jobsValidator;
        validate.validators.stagesValidator = this.stagesValidator;

        return {
            key: {
                presence: true,
                format: /[\d\w_-]+/,
            },
            state: {
                presence: true,
                inclusion: ['success', 'warning', 'error', 'info'],
            },
            title: {
                presence: true,
            },
            subTitle: {},
            image: {
                url: true,
            },
            userImage: {
                url: true,
            },
            stages: {
                stagesValidator: true,
            },
            jobs: {
                jobsValidator: true,
            },
        };
    }

    /**
     * Create a status and let the application take care of the rest.
     * If the data.key already exists, the StatusManager will take care of that.
     *
     * @param {Object} data
     */
    static createStatus(data) {
        console.log('[Status] Creating status...');

        data = StatusFactory.filterData(data);

        return validate
            .async(data, this.getStatusConstraints())
            .then(data => {
                data = { ...data, time: new Date() };
                const newStatus = new Status(data);

                Events.push(Events.event.newStatus, newStatus);

                console.log('[StatusFactory] Successfully added!');

                return newStatus;
            })
            .catch(errors => {
                console.log('[Status] Validation failed, throwing error.');

                throw {
                    message: 'The new status is not valid, please check the errors.',
                    errors: errors,
                };
            });
    }

    static updateJob(status, job) {
        const data = status.getRawData();

        if (validate(job, StatusFactory.getJobConstraints())) {
            console.log('[Status] Invalid job, not adding to status jobs.');
            return status;
        }

        if (!data.jobs) {
            data.jobs = [job];
            return StatusFactory.hydrateStatus(data);
        }

        data.jobs = data.jobs.filter(filterJob => filterJob.name !== job.name);
        data.jobs.push(job);

        return StatusFactory.hydrateStatus(data);
    }

    /**
     * This function should only be used when a previously created status
     * needs to become a status object again.There is no filtering or validation involved
     *
     * const rawStatus = status.getRawData()
     * const status = StatusFactory.hydrateStatus(rawStatus)
     *
     * @param {Object} data
     */
    static hydrateStatus(data) {
        return new Status(data);
    }

    static filterData(data) {
        data = StatusFactory.filterUserImage(data);
        data = StatusFactory.filterKey(data);

        return data;
    }

    static filterUserImage(data) {
        if (!data.userImage) {
            return data;
        }

        if (data.userImage.indexOf('gravatar.com') === -1) {
            return data;
        }

        let questionMarkLocation = data.userImage.indexOf('?');
        if (questionMarkLocation !== -1) {
            data.userImage = data.userImage.substring(0, questionMarkLocation);
        }

        data.userImage += '?size=300&default=mp';

        return data;
    }

    static filterKey(data) {
        data.key = data.key.toLowerCase();

        return data;
    }
}

module.exports = StatusFactory;
