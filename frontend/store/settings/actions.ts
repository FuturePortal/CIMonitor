import {
	CloseSettingsPanelAction,
	SetPasswordAction,
	SetSizeModifierAction,
	ToggleSettingsPanelAction,
	ToggleShowCompletedAction,
	ToggleShowUserAvatarsAction,
	ToggleSoundAction,
} from './types';

export const toggleShowCompleted = (): ToggleShowCompletedAction => ({
	type: 'settings-show-completed-toggle',
});

export const toggleShowUserAvatars = (): ToggleShowUserAvatarsAction => ({
	type: 'settings-show-user-avatars-toggle',
});

export const toggleSound = (): ToggleSoundAction => ({
	type: 'settings-sound-toggle',
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

export const setPassword = (password: string): SetPasswordAction => ({
	type: 'settings-password-set',
	password,
});
