import { ReactElement } from 'react';

import { Button, Container, Value } from './Modifier.style';

import Icon from '/frontend/components/Icon';

type Props = {
	value: number;
	min: number;
	max: number;
	step: number;
	// eslint-disable-next-line no-unused-vars
	onChange: (modifier: number) => void;
};

const Modifier = ({ value, step, min, max, onChange }: Props): ReactElement => {
	const increase = (): void => {
		let newValue = value + step;

		newValue = newValue > max ? max : newValue;

		onChange(Math.round(newValue * 100) / 100);
	};

	const decrease = (): void => {
		let newValue = value - step;

		newValue = newValue < min ? min : newValue;

		onChange(Math.round(newValue * 100) / 100);
	};

	return (
		<Container>
			<Button onClick={decrease} disabled={value === min}>
				<Icon icon="remove" />
			</Button>
			<Value>{String(value)}</Value>
			<Button onClick={increase} disabled={value === max}>
				<Icon icon="add" />
			</Button>
		</Container>
	);
};

export default Modifier;
