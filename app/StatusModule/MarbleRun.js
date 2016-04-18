const util = require('util');
var StatusModule = require('./StatusModule');

var MarbleRun = function(config) {
    console.log('Load module MarbleRun.');
    StatusModule.call(this, config);
};
MarbleRun.prototype.name = 'MarbleRun';

util.inherits(MarbleRun, StatusModule);

module.exports = MarbleRun;
