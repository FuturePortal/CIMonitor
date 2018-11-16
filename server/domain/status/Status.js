const validate = require('validate.js');
const Events = require('../Events');

class Status {
    constructor(data) {
        this.data = data;
    }

    static getJobConstraints() {
        return {
            name: {
                presence: true,
            },
            stage: {},
            state: {
                presence: true,
                inclusion: ['pending', 'running', 'error', 'success', 'allowed-error'],
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
            const validateErrors = validate(job, Status.getJobConstraints());
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

    static createStatus(data) {
        console.log('[Status] Creating status...');

        return validate
            .async(data, this.getStatusConstraints())
            .then(data => {
                data = { ...data, time: new Date() };
                const newStatus = new this(data);

                Events.push(Events.event.newStatus, newStatus);

                console.log('[Status] Successfully added!');

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

    updateJob(job) {
        if (validate(job, Status.getJobConstraints())) {
            console.log('[Status] Invalid job, not adding to status jobs.');
            return;
        }

        if (!this.data.jobs) {
            this.data.jobs = [job];
            return;
        }

        const existingJob = this.data.jobs.find(existingJob => existingJob.name === job.name);

        if (existingJob) {
            const index = this.data.jobs.indexOf(existingJob);
            this.data.jobs[index] = job;
            return;
        }

        this.data.jobs.push(job);
    }

    getRawData() {
        return this.data;
    }

    getKey() {
        return this.data.key;
    }
}

module.exports = Status;
