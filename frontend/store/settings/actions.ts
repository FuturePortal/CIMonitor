import { CloseSettingsPanelAction, ToggleSettingsPanelAction } from './types';

export const toggleSettingsPanel = (): ToggleSettingsPanelAction => ({
    type: 'settings-panel-toggle',
});

export const closeSettingsPanel = (): CloseSettingsPanelAction => ({
    type: 'settings-panel-close',
});
