import { CloseSettingsPanelAction, ToggleSettingsPanelAction, ToggleShowCompletedAction } from './types';

export const toggleShowCompleted = (): ToggleShowCompletedAction => ({
    type: 'settings-show-completed-toggle',
});

export const toggleSettingsPanel = (): ToggleSettingsPanelAction => ({
    type: 'settings-panel-toggle',
});

export const closeSettingsPanel = (): CloseSettingsPanelAction => ({
    type: 'settings-panel-close',
});
