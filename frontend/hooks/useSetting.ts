import { useContext } from 'react';
import { useSelector } from 'react-redux';

import appContext from '../App/AppContext';
import { getPassword, isHidingUserAvatars, isShowingCompleted, isSoundEnabled } from '../store/settings/selectors';

type Setting = 'showCompleted' | 'showAvatars' | 'sound' | 'password';

const useSetting = (setting: Setting): boolean | string => {
	const context = useContext(appContext);

	if (setting === 'password') {
		return useSelector(getPassword);
	}

	if (context && context[setting] !== null) {
		return context[setting] as boolean;
	}

	switch (setting) {
		case 'showAvatars':
			return !useSelector(isHidingUserAvatars);
		case 'showCompleted':
			return useSelector(isShowingCompleted);
		case 'sound':
			return useSelector(isSoundEnabled);
	}
};

export default useSetting;
