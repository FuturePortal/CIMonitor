class Config {
    constructor(triggers, events, modules, server, moduleClient) {
        this.triggers = triggers;
        this.events = events;
        this.modules = modules;
        this.server = server;
        this.moduleClient = moduleClient;
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

module.exports = Config;
