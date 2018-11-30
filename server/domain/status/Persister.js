const fileSystem = require('fs');
const path = require('path');

const Events = require('../Events');
const StatusManager = require('../status/StatusManager');
const StatusFactory = require('../status/StatusFactory');

class Persister {
    constructor() {
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

    saveStatusesOnChange() {
        Events.watch(Events.event.statusesUpdated, () => this.onStatusesUpdated());
    }

    loadSavedStatuses() {
        console.log('[Persister] Loading saved statuses if any...');

        if (!fileSystem.existsSync(this.statusesFile)) {
            console.log('[Persister] No saved statuses file found.');
            return;
        }

        try {
            const rawStatuses = JSON.parse(fileSystem.readFileSync(this.statusesFile));
            const statuses = rawStatuses.map(rawStatus => StatusFactory.hydrateStatus(rawStatus));

            StatusManager.overwriteStatuses(statuses);

            console.log(`[Persister] Load ${statuses.length} statuses from ${this.statusesFile}...`);
        } catch (error) {
            console.log(`[Persister] Failed to load the saved statuses...`);
            console.log(error);
        }
    }
}

module.exports = new Persister();
