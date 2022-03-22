import { RootState } from 'frontend/store';

export const isSettingsPanelOpen = (state: RootState): boolean => state.setting.open;

export const isShowingCompleted = (state: RootState): boolean => state.setting.showCompleted;
