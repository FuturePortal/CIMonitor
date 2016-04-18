const util = require('util');
var StatusModule = require('./StatusModule');

var TrafficLight = function(config) {
    console.log('Load module TrafficLight.');
    StatusModule.call(this, config);
};
TrafficLight.prototype.name = 'TrafficLight';

util.inherits(TrafficLight, StatusModule);

TrafficLight.prototype.handleStatus = function(status) {
    console.log('TRAFFIC LIGHT CONTROLS EVERYTHING HIMSELF.')
};

module.exports = TrafficLight;
