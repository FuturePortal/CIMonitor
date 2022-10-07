import { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Close, Frame, Overlay, Tab, Tabs, Title, TitleBar } from './SettingsPanel.style';

import Icon from '/frontend/components/Icon';
import { closeSettingsPanel } from '/frontend/store/settings/actions';
import { isSettingsPanelOpen } from '/frontend/store/settings/selectors';
import { hasNoStatuses } from '/frontend/store/status/selectors';

import About from './About';
import Customization from './Customization';
import Documentation from './Documentation';
import Statuses from './Statuses';

type SettingsTab = {
	icon: string;
	name: string;
	content: ReactElement;
};

const tabs: SettingsTab[] = [
	{
		icon: 'help_outline',
		name: 'About',
		content: <About />,
	},
	{
		icon: 'rule',
		name: 'Statuses',
		content: <Statuses />,
	},
	{
		icon: 'brush',
		name: 'Customization',
		content: <Customization />,
	},
	{
		icon: 'subject',
		name: 'Documentation',
		content: <Documentation />,
	},
];

const SettingsPanel = (): ReactElement => {
	let open = useSelector(isSettingsPanelOpen);
	const noStatuses = useSelector(hasNoStatuses);
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState(tabs[0].icon);

	if (noStatuses) {
		open = true;
	}

	if (!open) {
		return null;
	}

	return (
		<Overlay>
			<Frame>
				<TitleBar>
					<Title>CIMonitor version PACKAGE_VERSION</Title>
					{!noStatuses && (
						<Close onClick={() => dispatch(closeSettingsPanel())}>
							<Icon icon="close" />
						</Close>
					)}
				</TitleBar>
				<Tabs>
					{tabs.map((tab) => (
						<Tab active={tab.icon === activeTab} key={tab.icon} onClick={() => setActiveTab(tab.icon)}>
							<Icon icon={tab.icon} /> {tab.name}
						</Tab>
					))}
				</Tabs>
				{tabs.find((tab) => tab.icon === activeTab).content}
			</Frame>
		</Overlay>
	);
};

export default SettingsPanel;
