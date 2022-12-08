import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Showdown from 'showdown';

import Styled from './Changelog.style';
import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import { fetchChangelog } from '/frontend/store/cache/fetch';
import { getChangelog } from '/frontend/store/cache/selectors';

const Converter = new Showdown.Converter({
	ghMentions: true,
	openLinksInNewWindow: true,
});

Converter.addExtension({
	type: 'lang',
	regex: /\(#[\d]{1,}\)/g,
	replace: (match) => {
		const number = match.replace(/[^\d]/g, '');
		return `(<a href="https://github.com/FuturePortal/CIMonitor/pull/${number}" target="_blank">#${number}</a>)`;
	},
});

const About = (): ReactElement => {
	const changelog = useSelector(getChangelog);

	useEffect(() => {
		fetchChangelog();
	}, []);

	return (
		<Content>
			<p>You are currently running version PACKAGE_VERSION of CIMonitor.</p>
			{changelog.map((log) => (
				<Styled.Log key={log.version}>
					<Styled.Version>{log.version}</Styled.Version>
					<Styled.Description>
						<div dangerouslySetInnerHTML={{ __html: Converter.makeHtml(log.description) }} />
					</Styled.Description>
				</Styled.Log>
			))}
		</Content>
	);
};

export default About;
