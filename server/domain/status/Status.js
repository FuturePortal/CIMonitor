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

    isOld() {
        const oneWeekAgo = Moment().subtract(1, 'weeks');
        const statusCreatedTime = Moment(this.data.time);

        return statusCreatedTime.isBefore(oneWeekAgo);
    }
}

module.exports = Status;
