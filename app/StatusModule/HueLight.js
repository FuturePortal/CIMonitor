var util = require('util');
var StatusModule = require('./StatusModule');

/**
 * HueLight
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var HueLight = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(HueLight, StatusModule);

/**
 * Set the hue colors correctly on initialisation
 */
HueLight.prototype.init = function() {
    this.hub = this.config.hub;
    this.path = this.config.path;

    this.handleStatus();
};

HueLight.prototype.setColor = function(x, y) {
    console.log("Sending request");

    var msg = "{\"on\": true,\"xy\":[" + x + "," + y + "],\"bri\": 254}";

    var options = {
        "method": "PUT",
        "hostname": this.hub,
        "path": this.path,
        "headers": {
            "Content-Type": "application/json;charset=UTF-8",
            "Content-Length": Buffer.byteLength(msg)
        }
    };

    var req = require("http").request(options, function (res) {
    });

    req.write(msg);
    req.end();
};

/**
 * Handle the incoming statuses
 */
HueLight.prototype.handleStatus = function() {
    if (this.statusManager.hasFailureStatus()) {
        this.setColor(0.7, 0.2986);
        return;
    }

    if (this.statusManager.hasStartedStatus()) {
        this.setColor(0.5614, 0.4156);
        return;
    }

    this.setColor(0.2682, 0.6632);
};

module.exports = HueLight;
