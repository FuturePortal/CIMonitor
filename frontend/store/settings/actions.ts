import {
	CloseSettingsPanelAction,
	SetSizeModifierAction,
	ToggleSettingsPanelAction,
	ToggleShowCompletedAction,
	ToggleShowUserAvatarsAction,
} from './types';

export const toggleShowCompleted = (): ToggleShowCompletedAction => ({
	type: 'settings-show-completed-toggle',
});

export const toggleShowUserAvatars = (): ToggleShowUserAvatarsAction => ({
	type: 'settings-show-user-avatars-toggle',
});

export const toggleSettingsPanel = (): ToggleSettingsPanelAction => ({
	type: 'settings-panel-toggle',
});

export const closeSettingsPanel = (): CloseSettingsPanelAction => ({
	type: 'settings-panel-close',
});

export const setSizeModifier = (sizeModifier: number): SetSizeModifierAction => ({
	type: 'settings-size-modifier-set',
	sizeModifier,
});
