class FirebaseConfigParser {
    convertArrayObjectsToArrays(firebaseObject) {
        if (typeof firebaseObject !== 'object') {
            return firebaseObject;
        }

        if (this.objectShouldBeArray(firebaseObject)) {
            const actualArray = this.convertObjectArrayToArray(firebaseObject);

            return actualArray.map(arrayItem => this.convertArrayObjectsToArrays(arrayItem));
        }

        Object.keys(firebaseObject).map(objectKey => {
            firebaseObject[objectKey] = this.convertArrayObjectsToArrays(firebaseObject[objectKey]);
        });

        return firebaseObject;
    }

    objectShouldBeArray(firebaseObject) {
        let arrayKeyCount = 0;
        let shouldBeArray = true;

        Object.keys(firebaseObject).map(objectKey => {
            if (shouldBeArray && (isNaN(parseInt(objectKey)) || parseInt(objectKey) !== arrayKeyCount)) {
                shouldBeArray = false;
            }
            arrayKeyCount++;
        });

        return shouldBeArray;
    }

    convertObjectArrayToArray(objectArray) {
        const actualArray = [];

        Object.keys(objectArray).map(objectKey => {
            actualArray.push(objectArray[objectKey]);
        });

        return actualArray;
    }
}

module.exports = new FirebaseConfigParser();
