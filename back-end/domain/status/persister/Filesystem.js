const fileSystem = require('fs');
const path = require('path');

const AbstractPersister = require('./AbstractPersister');
const StatusFactory = require('../StatusFactory');
const StatusManager = require('../StatusManager');

class Filesystem extends AbstractPersister {
    constructor() {
        super();

        const filename = `saved-statuses.json`;
        const logPath = path.resolve(`${__dirname}/../../../../config/`);

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
        console.log('[Persister] Loading saved statuses from disk if any...');

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

module.exports = new Filesystem();
