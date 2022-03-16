import { ReactElement } from 'react';

import { Container, Buttons, Button, Brand } from './Toolbar.style';
import Icon from '/frontend/components/Icon';
import SuccessLight from './light/success.svg';
import ErrorLight from './light/error.svg';
import WarningLight from './light/warning.svg';
import { useSelector } from 'react-redux';
import { getGlobalState } from '/frontend/store/status/selectors';

const Toolbar = (): ReactElement => {
    const dashboardState = useSelector(getGlobalState);

    const light = {
        success: <SuccessLight />,
        warning: <WarningLight />,
        error: <ErrorLight />,
    };

    return (
        <Container>
            <Buttons>
                <Button>
                    <Icon icon="code" />
                </Button>
                <Button>
                    <Icon icon="settings" />
                </Button>
            </Buttons>
            <Brand>{light[dashboardState]}</Brand>
        </Container>
    );
};

export default Toolbar;
