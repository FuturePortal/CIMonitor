import styled from 'styled-components';

import { textColor } from '/frontend/style/colors';

export const Positioner = styled.div`
	position: relative;
	width: 100%;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
`;

export const Container = styled.div`
	background: #ffffff;
	padding: 1rem;
	border-radius: 1rem;
	color: ${textColor};
	width: 100%;
	max-width: 26rem;
	margin: 0 2rem;
`;
