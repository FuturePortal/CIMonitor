const FirebaseAdmin = require('firebase-admin');

class Firebase {
    constructor() {
        if (!process.env.FIREBASE_URL) {
            console.error('Missing environment variable FIREBASE_URL');
            process.exit(1);
        }

        if (!process.env.FIREBASE_SERVICE_ACCOUNT_FILE) {
            console.error('Missing environment variable FIREBASE_SERVICE_ACCOUNT_FILE');
            process.exit(1);
        }

        FirebaseAdmin.initializeApp({
            databaseURL: process.env.FIREBASE_URL,
            credential: FirebaseAdmin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_FILE),
        });

        this.database = FirebaseAdmin.database();
    }

    async load(ref) {
        try {
            console.log(`  [Firebase] Loading data from ${ref}...`);
            return await this.database.ref(ref).once('value', function(data) {
                return data;
            });
        } catch (error) {
            console.log(`  [Firebase] Failed to load data from ${ref}...`);
            console.log(error);
        }
    }

    async save(ref, data) {
        try {
            console.log(`  [Firebase] Saving data to ${ref}...`);
            return await this.database.ref(ref).set(data);
        } catch (error) {
            console.log(`  [Firebase] Failed to store data to ${ref}...`);
            console.log(error);
        }
    }
}

module.exports = new Firebase();
