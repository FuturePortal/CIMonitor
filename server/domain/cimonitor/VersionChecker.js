const moment = require('moment');
const semver = require('semver');
const fileSystem = require('fs');
const path = require('path');

const StatusManager = require('../status/StatusManager');
const StatusFactory = require('../status/StatusFactory');
const GitHubApi = require('./GitHubApi');

class VersionChecker {
    constructor() {
        this.lastVersionCheck = null;
        this.statusKey = 'cimonitor-status-check';
        this.currentVersion = this.getCurrentVersion();
    }

    getLatestVersion() {
        return GitHubApi.call('repos/CIMonitor/CIMonitor/releases/latest').then(latestVersionInfo => {
            return latestVersionInfo.tag_name;
        });
    }

    getCurrentVersion() {
        const root = path.resolve(`${__dirname}/../../../`);
        this.packageFile = `${root}/package.json`;

        const currentVersion = JSON.parse(fileSystem.readFileSync(this.packageFile)).version;
        console.log(`[VersionChecker] Currently running CIMonitor version ${currentVersion}.`);

        return currentVersion;
    }

    pushNewVersionStatus(latestVersion) {
        StatusFactory.createStatus({
            key: this.statusKey,
            title: `CIMonitor`,
            subTitle: `Version ${latestVersion} is available.`,
            image: 'https://avatars2.githubusercontent.com/u/18479455?s=200&v=4',
            state: 'info',
        });
    }

    checkVersion() {
        console.log(`[VersionChecker] Checking if a new version is available...`);
        this.getLatestVersion()
            .then(latestVersion => {
                const currentVersion = this.currentVersion;

                // Is current version older than the latest version
                if (semver.lt(currentVersion, latestVersion)) {
                    console.log(`[VersionChecker] New version ${latestVersion} is available!`);
                    this.pushNewVersionStatus(latestVersion);
                    this.lastVersionCheck = moment().format();
                    return;
                }

                console.log(`[VersionChecker] Already on the latest version ${latestVersion}.`);
                if (StatusManager.getStatusByKey(this.statusKey)) {
                    StatusManager.removeStatus(this.statusKey);
                }
            })
            .catch(() => {
                console.log(`[VersionChecker] Couldn't fetch the latest version of CIMonitor.`);
            });
    }

    isTimeToCheck() {
        if (!this.lastVersionCheck) {
            return true;
        }

        const shouldCheckTime = moment().subtract(6, 'hours');
        const lastCheck = moment(this.lastVersionCheck);

        return lastCheck.isBefore(shouldCheckTime);
    }

    scheduleVersionChecks() {
        setInterval(() => {
            if (this.isTimeToCheck()) {
                this.checkVersion();
            }
        }, moment.duration(5, 'minutes').asMilliseconds());

        this.checkVersion();
    }
}

module.exports = new VersionChecker();
