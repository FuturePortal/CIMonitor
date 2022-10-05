import styled from 'styled-components';

import { stateColor, stateLightColor, textColor } from '/frontend/style/colors';

export const Container = styled.div`
	display: flex;
	align-items: center;
`;

export const Button = styled.button`
	width: 2rem;
	height: 2rem;
	background: ${stateColor.success};
	color: ${textColor};
	border-radius: 50%;

	&:disabled {
		background: ${stateLightColor.warning};
		color: ${stateColor.warning};
		cursor: default;
	}
`;

export const Value = styled.div`
	width: 2.5rem;
	text-align: center;
`;
