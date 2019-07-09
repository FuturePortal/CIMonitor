class FirebaseDataParser {
    convertObjectArraysToArrays(data) {
        if (typeof data !== 'object') {
            return data;
        }

        if (this.shouldObjectBeArray(data)) {
            const actualArray = this.convertObjectToArray(data);

            return actualArray.map(arrayItem => this.convertObjectArraysToArrays(arrayItem));
        }

        Object.keys(data).map(objectKey => {
            data[objectKey] = this.convertObjectArraysToArrays(data[objectKey]);
        });

        return data;
    }

    shouldObjectBeArray(dataObject) {
        let arrayKeyCount = 0;
        let shouldBeArray = true;

        Object.keys(dataObject).map(objectKey => {
            if (isNaN(parseInt(objectKey)) || parseInt(objectKey) !== arrayKeyCount) {
                shouldBeArray = false;
            }
            arrayKeyCount++;
        });

        return shouldBeArray;
    }

    convertObjectToArray(arrayObject) {
        const actualArray = [];

        Object.keys(arrayObject).map(objectKey => {
            actualArray.push(arrayObject[objectKey]);
        });

        return actualArray;
    }
}

module.exports = new FirebaseDataParser();
