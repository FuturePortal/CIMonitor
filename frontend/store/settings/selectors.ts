import { RootState } from '/frontend/store/store';

export const isSettingsPanelOpen = (state: RootState): boolean => state.setting.open;

export const isShowingCompleted = (state: RootState): boolean => state.setting.showCompleted;

export const isSoundEnabled = (state: RootState): boolean => state.setting.soundEnabled;

export const isHidingUserAvatars = (state: RootState): boolean => !state.setting.showUserAvatars;

export const getSizeModifier = (state: RootState): number =>
	state.setting.sizeModifier ? state.setting.sizeModifier : 1;
