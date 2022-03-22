import { ReactElement } from 'react';

import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Alert from '/frontend/components/Alert';

const Customization = (): ReactElement => {
    return (
        <Content>
            <h1>Customization</h1>
            <Alert>
                <p>
                    This is an early release of CIMonitor version 4. Features that can be expected in the next releases:
                </p>
                <ul>
                    <li>Customization features like toggling if a completed step should be shown or not.</li>
                    <li>Adding password protection to your server settings and webhooks.</li>
                </ul>
            </Alert>
        </Content>
    );
};

export default Customization;
