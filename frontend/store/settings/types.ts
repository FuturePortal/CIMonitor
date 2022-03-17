export type StateType = {
    open: boolean;
};

export type ToggleSettingsPanelAction = {
    type: 'settings-panel-toggle';
};

export type CloseSettingsPanelAction = {
    type: 'settings-panel-close';
};

export type ActionTypes = ToggleSettingsPanelAction | CloseSettingsPanelAction;
