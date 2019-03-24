class AbstractLoader {
    constructor() {
        this.triggers = [];
        this.events = [];
        this.modules = [];
        this.server = {};
        this.moduleClient = {};
    }

    async loadConfig() {
        throw new Error('Implement loadConfig()');
    }

    getTriggers() {
        return this.triggers;
    }

    getEventByName(eventName) {
        return this.events.find(event => event.name === eventName);
    }

    getModules() {
        return this.modules;
    }

    getServerPort() {
        return this.server.port;
    }

    getPersonalAccessTokenGitLab() {
        return this.server.personalAccessTokenGitLab;
    }

    getMaster() {
        return this.moduleClient.master;
    }
}

module.exports = AbstractLoader;
