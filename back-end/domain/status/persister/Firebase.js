const AbstractPersister = require('./AbstractPersister');
const StatusManager = require('../StatusManager');
const StatusFactory = require('../StatusFactory');
const FirebaseStorage = require('../../../storage/Firebase');

class Firebase extends AbstractPersister {
    onStatusesUpdated() {
        const statuses = StatusManager.getRawStatuses();

        console.log('[FirebasePersister] Saving statuses to Firebase...');

        FirebaseStorage.save('statuses', statuses)
            .then(function() {
                console.log(`[FirebasePersister] Statuses are saved to Firebase.`);
            })
            .error(function() {
                console.error(`[FirebasePersister] Failed saving statuses to Firebase.`);
            });
    }

    async loadSavedStatuses() {
        console.log('[FirebasePersister] Loading saved statuses from Firebase if any...');

        try {
            let data = await FirebaseStorage.load('statuses');
            data = data.toJSON();
            if (data === null) {
                console.log(`[FirebasePersister] No previous statuses in Firebase...`);
                return;
            }
            const statuses = data.map(rawStatus => StatusFactory.hydrateStatus(rawStatus));
            StatusManager.overwriteStatuses(statuses);
            console.log(`[FirebasePersister] Loaded ${statuses.length} statuses from Firebase...`);
        } catch (error) {
            console.error(`[FirebasePersister] Failed loading statuses from Firebase...`);
            console.error(error);
        }
    }
}

module.exports = new Firebase();
