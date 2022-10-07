import styled from 'styled-components';

import { stateColor } from '/frontend/style/colors';

import { State } from '/types/status';

type BoxProps = {
	state: State;
};

export const Container = styled.div<BoxProps>`
	border-radius: 0.5rem;
	display: flex;
	gap: 0.5rem;
	padding: 1rem;
	margin-bottom: 1rem;
	background: ${(props) => stateColor[props.state]};
	align-items: center;

	ul:last-child,
	p:last-child {
		margin-bottom: 0;
	}
`;

export const IconSpace = styled.div``;

export const Message = styled.div`
	flex-grow: 1;
`;
