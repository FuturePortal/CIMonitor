import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Styled from './Changelog.style';
import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import { fetchChangelog } from '/frontend/store/cache/fetch';
import { getChangelog } from '/frontend/store/cache/selectors';

const cleanDescription = (description: string) => {
	// Add enters
	description = description.replace(/\r/g, '<br />').replace(/\n/g, '');

	return description;
};

const About = (): ReactElement => {
	const changelog = useSelector(getChangelog);

	useEffect(() => {
		fetchChangelog();
	}, []);

	return (
		<Content>
			<h1>Changelog</h1>
			{changelog.map((log) => (
				<Styled.Log key={log.version}>
					<Styled.Version>{log.version}</Styled.Version>
					<Styled.Description>
						<p dangerouslySetInnerHTML={{ __html: cleanDescription(log.description) }} />
					</Styled.Description>
				</Styled.Log>
			))}
		</Content>
	);
};

export default About;
