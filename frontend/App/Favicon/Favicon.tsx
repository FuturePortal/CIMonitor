import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { getGlobalState } from '/frontend/store/status/selectors';
import { State } from 'types/status';

import ErrorIcon from './icon/error.png';
import SuccessIcon from './icon/success.png';
import WarningIcon from './icon/warning.png';

const getIcon = (state: State) => {
    if (state === 'error') {
        return ErrorIcon;
    }

    if (state === 'warning') {
        return WarningIcon;
    }

    return SuccessIcon;
};

const Favicon = (): ReactElement => {
    const globalState = useSelector(getGlobalState);

    document.getElementById('favicon').setAttribute('href', getIcon(globalState));

    return null;
};

export default Favicon;
