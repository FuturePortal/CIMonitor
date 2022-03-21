import { ReactElement } from 'react';

import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Alert from '/frontend/components/Alert';

const Customization = (): ReactElement => {
    return (
        <Content>
            <h1>Customization</h1>
            <Alert state="warning">
                Customization is not yet available in the first release. Expect more customization options here soon.
            </Alert>
        </Content>
    );
};

export default Customization;
