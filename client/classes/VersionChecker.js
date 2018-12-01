import semver from 'semver';

class VersionChecker {
    constructor() {
        this.currentVersion = null;
        this.xmlHttp = null;
    }

    checkForNewVersion() {
        this.currentVersion = window.CIMonitorVersion;

        this.xmlHttp = new XMLHttpRequest();
        this.xmlHttp.onreadystatechange = () => this.onVersionResult();
        this.xmlHttp.open('GET', '/version', true);
        this.xmlHttp.send(null);
    }

    onVersionResult() {
        // readyState 4 means the response is complete
        if (this.xmlHttp.readyState !== 4) {
            return;
        }

        if (this.xmlHttp.status !== 200) {
            console.log('Failed to fetch the CIMonitor server version.');
            return;
        }

        const result = JSON.parse(this.xmlHttp.responseText);

        if (semver.lt(this.currentVersion, result.version)) {
            this.refreshDashboard(result.version);
            return;
        }

        console.log(`Dashboard version ${this.currentVersion} up-to-date with server version ${result.version}.`);
    }

    refreshDashboard(serverVersion) {
        console.log(`Dashboard version ${serverVersion} available, currently on ${this.currentVersion}.`);
        console.log('Refreshing in 10 seconds to get the latest update.');
        console.log('Stuck in a loop? run on the server: make build-production');

        setTimeout(() => location.reload(), 10000);
    }
}

export default (VersionChecker = new VersionChecker()); // eslint-disable-line no-class-assign
