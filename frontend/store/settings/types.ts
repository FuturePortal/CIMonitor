export type StateType = {
	open: boolean;
	showCompleted: boolean;
	sizeModifier: number;
	showUserAvatars: boolean;
	soundEnabled: boolean;
};

export type SetSizeModifierAction = {
	type: 'settings-size-modifier-set';
	sizeModifier: number;
};

export type ToggleShowCompletedAction = {
	type: 'settings-show-completed-toggle';
};

export type ToggleSoundAction = {
	type: 'settings-sound-toggle';
};

export type ToggleSettingsPanelAction = {
	type: 'settings-panel-toggle';
};

export type CloseSettingsPanelAction = {
	type: 'settings-panel-close';
};

export type ToggleShowUserAvatarsAction = {
	type: 'settings-show-user-avatars-toggle';
};

export type ActionTypes =
	| ToggleSettingsPanelAction
	| CloseSettingsPanelAction
	| ToggleShowCompletedAction
	| SetSizeModifierAction
	| ToggleShowUserAvatarsAction
	| ToggleSoundAction;
