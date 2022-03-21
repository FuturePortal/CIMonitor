import { ReactElement } from 'react';

import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Alert from '/frontend/components/Alert';

const About = (): ReactElement => {
    return (
        <Content>
            <p>
                CIMonitor is a dashboard where all your CI statuses come together. Check if all tests have passed, and
                if deployments are successful. Never miss a failed build again.
            </p>
            <Alert state="warning">
                A version check will be shown here, letting you know if a new version is available.
            </Alert>
            <Alert>
                <p>
                    This is an early release of CIMonitor version 4. Features that can be expected in the next releases:
                </p>
                <ul>
                    <li>Manually removing statuses via the settings panel.</li>
                    <li>Customization features like toggling if a completed step should be shown or not.</li>
                    <li>Adding a contributors list to the about tab (we love open source contributions).</li>
                    <li>Adding password protection to your server settings and webhooks.</li>
                </ul>
            </Alert>
        </Content>
    );
};

export default About;
