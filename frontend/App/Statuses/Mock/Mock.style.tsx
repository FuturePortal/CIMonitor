import styled from 'styled-components';

import { stateColor } from '/frontend/style/colors';

import { State } from '/types/status';

export const Mocks = styled.div`
	height: 100dvh;
	width: 100%;
	overflow: hidden;
	position: fixed;
	z-index: 1;
`;

type MockProps = {
	state: State;
};

export const Mock = styled.div<MockProps>`
	height: 10rem;
	background-color: ${(props) => stateColor[props.state]};
	margin-bottom: 1rem;
`;
