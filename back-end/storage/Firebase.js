const FirebaseAdmin = require('firebase-admin');
const FirebaseDataParser = require('./FirebaseDataParser');

class Firebase {
    constructor() {
        if (!process.env.FIREBASE_URL) {
            console.error('[Firebase] Missing environment variable FIREBASE_URL');
            process.exit(1);
        }

        if (!process.env.FIREBASE_PRIVATE_KEY_FILE) {
            console.error('[Firebase] Missing environment variable FIREBASE_PRIVATE_KEY_FILE');
            process.exit(1);
        }

        FirebaseAdmin.initializeApp({
            databaseURL: process.env.FIREBASE_URL,
            credential: FirebaseAdmin.credential.cert(process.env.FIREBASE_PRIVATE_KEY_FILE),
        });

        this.database = FirebaseAdmin.database();
    }

    async load(ref) {
        try {
            return await this.database.ref(ref).once('value', function(data) {
                return data;
            }).then(data => {
                return FirebaseDataParser.convertObjectArraysToArrays(data.toJSON());
            });
        } catch (error) {
            console.error(`[Firebase] ${error}`);
        }
    }

    async save(ref, data) {
        try {
            return await this.database.ref(ref).set(data);
        } catch (error) {
            console.error(`[Firebase] ${error}`);
        }
    }
}

module.exports = new Firebase();
