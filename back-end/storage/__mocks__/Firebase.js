class Firebase {
    async load(ref) {
        try {
            return await this.database.ref(ref).once('value', function(data) {
                return data;
            });
        } catch (error) {
            console.error(error);
        }
    }

    async save(ref, data) {
        try {
            return await this.database.ref(ref).set(data);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new Firebase();
