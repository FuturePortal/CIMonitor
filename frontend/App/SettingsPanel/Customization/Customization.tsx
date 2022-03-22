import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { About, Description, Setting, Title, Tool } from './Customization.style';
import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Icon from '/frontend/components/Icon';
import Toggle from '/frontend/components/Toggle';
import { toggleShowCompleted } from '/frontend/store/settings/actions';
import { isShowingCompleted } from '/frontend/store/settings/selectors';

const Customization = (): ReactElement => {
    const showCompleted = useSelector(isShowingCompleted);
    const dispatch = useDispatch();

    const server = <Icon icon="warning" state="warning" title="Server setting" />;

    return (
        <Content>
            <p>
                You can customize your dashboard with the settings below. Note that all settings with a {server} are
                server settings, and are changed for everyone.
            </p>
            <Setting>
                <About>
                    <Title>Show completed steps</Title>
                    <Description>Do you want to see all completed steps that your status went trough?</Description>
                </About>
                <Tool>
                    <Toggle onToggle={() => dispatch(toggleShowCompleted())} enabled={showCompleted} />
                </Tool>
            </Setting>
            <Setting>
                <About>
                    <Title>Remove statuses after</Title>
                    <Description>
                        {server} Automatically remove statuses older than x days. Not yet customisable in this version.
                    </Description>
                </About>
                <Tool>7 days</Tool>
            </Setting>
        </Content>
    );
};

export default Customization;
