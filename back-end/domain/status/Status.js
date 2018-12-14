const Moment = require('moment');

class Status {
    constructor(data) {
        this.data = data;
    }

    getRawData() {
        return this.data;
    }

    getKey() {
        return this.data.key;
    }

    getState() {
        return this.data.state;
    }

    getJobs() {
        if (this.data.jobs) {
            return this.data.jobs;
        }

        return [];
    }

    isOld() {
        const oneWeekAgo = Moment().subtract(1, 'weeks');
        const statusTime = Moment(this.data.time);

        return statusTime.isBefore(oneWeekAgo);
    }
}

module.exports = Status;
