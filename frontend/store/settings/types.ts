export type StateType = {
	open: boolean;
	showCompleted: boolean;
	sizeModifier: number;
	showUserAvatars: boolean;
};

export type SetSizeModifierAction = {
	type: 'settings-size-modifier-set';
	sizeModifier: number;
};

export type ToggleShowCompletedAction = {
	type: 'settings-show-completed-toggle';
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
	| ToggleShowUserAvatarsAction;
