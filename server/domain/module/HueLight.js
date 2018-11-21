const AbstractModule = require('./AbstractModule');
const Events = require('../Events');
const StatusManager = require('../status/StatusManager');

class HueLight extends AbstractModule {
    init() {
        Events.watch(Events.event.statusesUpdated, this.setLightColor.bind(this));
    }

    setColor(x, y) {
        try {
            const msg = `{"on": true,"xy":[${x},${y}],"bri": 254}`;

            const options = {
                method: 'PUT',
                hostname: this.config.hub,
                path: this.config.path,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Content-Length': Buffer.byteLength(msg),
                },
            };

            const request = require('http').request(options);

            request.write(msg);
            request.end();
        } catch (error) {
            console.log('[VueLight] Error :(');
            console.log(error);
        }
    }

    setLightColor() {
        const globalState = StatusManager.getGlobalState();

        if (globalState === 'error') {
            console.log('[VueLight] Changing color to error.');
            this.setColor(0.7, 0.2986);
            return;
        }

        if (globalState === 'warning') {
            console.log('[VueLight] Changing color to warning.');
            this.setColor(0.5614, 0.4156);
            return;
        }

        console.log('[VueLight] Changing color to success.');
        this.setColor(0.2682, 0.6632);
    }
}

module.exports = HueLight;
