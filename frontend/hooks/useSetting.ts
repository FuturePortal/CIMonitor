import { useContext } from 'react';
import { useSelector } from 'react-redux';

import appContext from '../App/AppContext';
import { isHidingUserAvatars, isShowingCompleted } from '../store/settings/selectors';

type Setting = 'showCompleted' | 'showAvatars';

const useSetting = (setting: Setting): boolean => {
	const context = useContext(appContext);

	if (context[setting] !== null) {
		return context[setting];
	}

	switch (setting) {
		case 'showAvatars':
			return !useSelector(isHidingUserAvatars);
		case 'showCompleted':
			return useSelector(isShowingCompleted);
	}
};

export default useSetting;
