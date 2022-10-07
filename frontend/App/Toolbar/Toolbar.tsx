import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Brand, Button, Buttons, Container } from './Toolbar.style';

import GitHub from './github.svg';
import ErrorLight from './light/error.svg';
import SuccessLight from './light/success.svg';
import WarningLight from './light/warning.svg';

import Icon from '/frontend/components/Icon';
import { closeSettingsPanel, toggleSettingsPanel } from '/frontend/store/settings/actions';
import { getGlobalState, hasNoStatuses } from '/frontend/store/status/selectors';

const Toolbar = (): ReactElement => {
	const dashboardState = useSelector(getGlobalState);
	const dispatch = useDispatch();
	const noStatuses = useSelector(hasNoStatuses);

	const light = {
		success: <SuccessLight />,
		warning: <WarningLight />,
		error: <ErrorLight />,
	};

	return (
		<Container>
			<Buttons>
				<Button onClick={() => window.open('https://github.com/FuturePortal/CIMonitor', '_blank').focus()}>
					<GitHub />
				</Button>
				<Button onClick={() => dispatch(noStatuses ? closeSettingsPanel() : toggleSettingsPanel())}>
					<Icon icon="settings" />
				</Button>
			</Buttons>
			<Brand>{light[dashboardState]}</Brand>
		</Container>
	);
};

export default Toolbar;
