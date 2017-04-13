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
    var webHook;
    var request;

    if (this.statusManager.hasStartedStatus() && this.config.hasOwnProperty('started')) {
        webHook = this.config.started;
    } else if(this.statusManager.hasFailureStatus() && this.config.hasOwnProperty('failure')) {
        webHook = this.config.failure;
    } else if(this.config.hasOwnProperty('success')) {
        webHook = this.config.success;
    } else {
        console.warn("[WebHook] Unhandled status or invalid WebHook configuration.");
        return;
    }

    request = this.https.request({
        "method": "GET",
        "hostname": webHook.hostName,
        "path": webHook.path,
        "headers": {
            "Content-Type": "application/json;charset=UTF-8"
        }
    });

    request.end();
};

module.exports = WebHook;
