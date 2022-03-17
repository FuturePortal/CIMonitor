import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Brand, Button, Buttons, Container } from './Toolbar.style';

import ErrorLight from './light/error.svg';
import SuccessLight from './light/success.svg';
import WarningLight from './light/warning.svg';

import Icon from '/frontend/components/Icon';
import { toggleSettingsPanel } from '/frontend/store/settings/actions';
import { getGlobalState } from '/frontend/store/status/selectors';

const Toolbar = (): ReactElement => {
    const dashboardState = useSelector(getGlobalState);
    const dispatch = useDispatch();

    const light = {
        success: <SuccessLight />,
        warning: <WarningLight />,
        error: <ErrorLight />,
    };

    return (
        <Container>
            <Buttons>
                <Button onClick={() => window.open('https://github.com/cimonitor/cimonitor', '_blank').focus()}>
                    <Icon icon="code" />
                </Button>
                <Button onClick={() => dispatch(toggleSettingsPanel())}>
                    <Icon icon="settings" />
                </Button>
            </Buttons>
            <Brand>{light[dashboardState]}</Brand>
        </Container>
    );
};

export default Toolbar;
