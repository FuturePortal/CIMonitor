import { ReactElement } from 'react';

import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Alert from '/frontend/components/Alert';

const Statuses = (): ReactElement => {
    return (
        <Content>
            <h1>Statuses</h1>
            <Alert state="warning">
                Manually removing statuses is not yet available. For now, statuses will be removed automatically after 7
                days.
            </Alert>
        </Content>
    );
};

export default Statuses;
