var StatusModule = require('./StatusModule');

/**
 * WebHook
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var WebHook = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};

/**
 * Sets the http module.
 */
WebHook.prototype.init = function() {
    this.https = require('https');
};

/**
 * Handle the incoming statuses
 */
WebHook.prototype.handleStatus = function() {
    var webHook,
        request;

    if (this.statusManager.hasStartedStatus()) {
        webHook = this.config.started;
    } else if(this.statusManager.hasFailureStatus()) {
        webHook = this.config.failure;
    } else {
        webHook = this.config.success;
    }

    request = this.https.request({
        "method": "GET",
        "hostname": webHook.hostName,
        "path": webHook.path,
        "headers": {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }, function(response) {
    });

    request.end();
};

module.exports = WebHook;