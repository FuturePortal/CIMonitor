var StatusModule = function(config) {
    this.config = config;

    console.log(JSON.stringify(config));
};

StatusModule.prototype.handleStatus = function(status) {
    //console.log('Incoming status for module to handle');
    var events = this.config.events;
    //console.log(JSON.stringify(this.config));
    //console.log(JSON.stringify(events));
    for (var event in events) {
        if (this.doesEventMeetCriteria(events[event].on, status)) {
            this.execute(events[event].do);
        }
    }
};

StatusModule.prototype.doesEventMeetCriteria = function(criteria, status) {
    return true;
};

StatusModule.prototype.execute = function(doConfig) {
    console.log('Nothing to do for: ' + JSON.stringify(doConfig));
};

module.exports = StatusModule;
