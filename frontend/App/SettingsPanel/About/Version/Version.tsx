import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';

import Alert from '/frontend/components/Alert';

type VersionResponse = {
    server: string;
    latest: string;
};

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
    const [version, setVersion] = useState<VersionResponse | null>(null);
    const [failed, setFailed] = useState(false);

    const fetchLatestVersion = async () => {
        try {
            const response = await axios.get('/version');

            setVersion(response.data);
            setFailed(false);
        } catch (error) {
            setFailed(true);
        }
    };

    useEffect(() => {
        fetchLatestVersion();
    }, []);

    if (failed) {
        return <Alert state="error">Failed to fetch the latest version info.</Alert>;
    }

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
