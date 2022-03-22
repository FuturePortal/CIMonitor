import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Alert from '/frontend/components/Alert';
import { fetchVersion } from '/frontend/store/cache/fetch';
import { getVersion } from '/frontend/store/cache/selectors';

const isNewest = (currentVersion: string, latestVersion: string): boolean => {
    const currentVersionSplit = currentVersion.split('.');
    const latestVersionSplit = latestVersion.split('.');

    for (let versionPart in currentVersionSplit) {
        if (parseInt(currentVersionSplit[versionPart]) > parseInt(latestVersionSplit[versionPart])) {
            return true;
        }

        if (parseInt(currentVersionSplit[versionPart]) < parseInt(latestVersionSplit[versionPart])) {
            return false;
        }
    }

    return true;
};

const Version = (): ReactElement => {
    const version = useSelector(getVersion);

    useEffect(() => {
        fetchVersion();
    }, []);

    if (!version) {
        return <Alert state="info">Checking for the latest version...</Alert>;
    }

    if (isNewest('PACKAGE_VERSION', version.latest)) {
        return <Alert state="success">You are on the latest version.</Alert>;
    }

    if (isNewest('PACKAGE_VERSION', version.server)) {
        return (
            <Alert state="error">
                Your dashboard is out of sync with the server. Reload the page to see the latest changes.
            </Alert>
        );
    }

    return (
        <Alert state="warning">
            A newer version {version.latest} is available. You&apos;re currently running PACKAGE_VERSION, consider
            upgrading.
        </Alert>
    );
};

export default Version;
