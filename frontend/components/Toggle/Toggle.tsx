import { ReactElement } from 'react';

import { Button, Switch } from './Toggle.style';

type Props = {
	onToggle: () => void;
	enabled: boolean;
};

const Toggle = ({ enabled, onToggle }: Props): ReactElement => {
	return (
		<Button enabled={enabled} onClick={onToggle}>
			<Switch />
		</Button>
	);
};

export default Toggle;
