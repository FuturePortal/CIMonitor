import { ActionTypes, StateType } from './types';

const defaultState: StateType = {
	open: false,
	showCompleted: false,
	sizeModifier: 1,
	showUserAvatars: true,
	soundEnabled: false,
	password: '',
};

const reducer = (state = defaultState, action: ActionTypes): StateType => {
	switch (action.type) {
		case 'settings-panel-toggle':
			return {
				...state,
				open: !state.open,
			};
		case 'settings-panel-close':
			return {
				...state,
				open: false,
			};
		case 'settings-sound-toggle':
			return {
				...state,
				soundEnabled: !state.soundEnabled,
			};
		case 'settings-show-completed-toggle':
			return {
				...state,
				showCompleted: !state.showCompleted,
			};
		case 'settings-size-modifier-set':
			return {
				...state,
				sizeModifier: action.sizeModifier,
			};
		case 'settings-show-user-avatars-toggle':
			return {
				...state,
				showUserAvatars: !state.showUserAvatars,
			};
		case 'settings-password-set':
			return {
				...state,
				password: action.password,
			};
		default:
			return state;
	}
};

export default reducer;
