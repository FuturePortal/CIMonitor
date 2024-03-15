import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { getGlobalState } from '/frontend/store/status/selectors';

import ErrorIcon from './icon/error.png';
import SuccessIcon from './icon/success.png';
import WarningIcon from './icon/warning.png';

import { State } from '/types/status';

const getIcon = (state: State): string => {
	if (state === 'error') {
		return ErrorIcon as string;
	}

	if (state === 'warning') {
		return WarningIcon as string;
	}

	return SuccessIcon as string;
};

const Favicon = (): ReactElement => {
	const globalState = useSelector(getGlobalState);

	document.getElementById('favicon').setAttribute('href', getIcon(globalState));

	return null;
};

export default Favicon;
