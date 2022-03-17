import { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Close, Frame, Overlay, Tab, Tabs, Title, TitleBar } from './SettingsPanel.style';

import Icon from '/frontend/components/Icon';
import { closeSettingsPanel } from '/frontend/store/settings/actions';
import { isSettingsPanelOpen } from '/frontend/store/settings/selectors';
import { getStatusCount } from '/frontend/store/status/selectors';

import About from './About';
import Customisation from './Customisation';
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
        name: 'Customisation',
        content: <Customisation />,
    },
    {
        icon: 'auto_stories',
        name: 'Documentation',
        content: <Documentation />,
    },
];

const SettingsPanel = (): ReactElement => {
    const open = useSelector(isSettingsPanelOpen);
    const statusCount = useSelector(getStatusCount);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(tabs[0].icon);

    if (!open && statusCount > 0) {
        return null;
    }

    return (
        <Overlay>
            <Frame>
                <TitleBar>
                    <Title>CIMonitor version 4</Title>
                    {statusCount > 0 && (
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
