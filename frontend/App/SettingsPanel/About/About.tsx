import { ReactElement } from 'react';

import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Contributors from './Contributors';
import Version from './Version';

const About = (): ReactElement => {
	return (
		<Content>
			<p>
				CIMonitor is a dashboard where all your CI statuses come together. Check if all tests have passed, and
				if deployments are successful. Never miss a failed build again. Let webhooks push the latest updates to
				CIMonitor, and it will create a neat overview of those statuses.
			</p>
			<Version />
			<p>A big thank you to all the contributors of the project:</p>
			<Contributors />
		</Content>
	);
};

export default About;
