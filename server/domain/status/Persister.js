const fileSystem = require('fs');
const path = require('path');

const Events = require('../Events');
const StatusManager = require('../status/StatusManager');
const Status = require('../status/Status');

class Persister {
    constructor() {
        Events.watch(Events.event.statusesUpdated, () => this.onStatusesUpdated());

        const filename = `saved-statuses.json`;
        const logPath = path.resolve(`${__dirname}/../../config/`);

        this.statusesFile = `${logPath}/${filename}`;
    }

    onStatusesUpdated() {
        const statuses = StatusManager.getRawStatuses();

        fileSystem.writeFile(this.statusesFile, JSON.stringify(statuses, null, 4), error => {
            if (error) {
                return console.log(`[Persister] error saving: ${error}`);
            }

            console.log(`[Persister] Statuses are saved to ${this.statusesFile}.`);
        });
    }

    loadSavedStatuses() {
        console.log('[Persister] Loading saved statuses if any...');

        if (!fileSystem.existsSync(this.statusesFile)) {
            console.log('[Persister] No saved statuses file found.');
            return;
        }

        const rawStatuses = JSON.parse(fileSystem.readFileSync(this.statusesFile));
        const statuses = rawStatuses.map(rawStatus => Status.hydrateStatus(rawStatus));

        StatusManager.overwriteStatuses(statuses);

        console.log(`[Persister] Load ${statuses.length} statuses from ${this.statusesFile}...`);
    }
}

module.exports = new Persister();
