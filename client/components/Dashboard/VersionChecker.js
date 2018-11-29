import semver from 'semver';

class VersionChecker {
    constructor() {
        this.currentVersion = null;
        this.xmlHttp = null;
    }

    checkForNewVersion(currentVersion) {
        this.currentVersion = currentVersion;

        console.log('Checking for a new server version...');
        console.log(`Dashboard running on version ${currentVersion}`);

        this.xmlHttp = new XMLHttpRequest();
        this.xmlHttp.onreadystatechange = () => this.onVersionResult();
        this.xmlHttp.open('GET', '/version', true);
        this.xmlHttp.send(null);
    }

    onVersionResult() {
        if (this.xmlHttp.readyState == 4 && this.xmlHttp.status == 200) {
            const result = JSON.parse(this.xmlHttp.responseText);
            console.log(`Server running on version ${result.version}`);

            if (semver.lt(this.currentVersion, result.version)) {
                this.refreshDashboard();
                return;
            }
            console.log(`Dashboard still up-to-date!`);
        }
    }

    refreshDashboard() {
        console.log('Refreshing in 10 seconds to be up-to-date');
        console.log('Stuck in a loop? run on the server: make build-production');
        setTimeout(() => location.reload(), 10000);
    }
}

export default (VersionChecker = new VersionChecker()); // eslint-disable-line no-class-assign
