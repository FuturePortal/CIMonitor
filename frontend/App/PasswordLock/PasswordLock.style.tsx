import styled from 'styled-components';

import { textColor, textMutedColor } from '/frontend/style/colors';

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
	border-radius: 1rem;
	color: ${textColor};
	width: 100%;
	max-width: 26rem;
	margin: 0 2rem;
`;

export const Title = styled.h1`
	margin: 1rem 1rem 0;
`;

export const SubTitle = styled.h2`
	margin: 0rem 1rem;
	font-size: 0.9rem;
	color: ${textMutedColor};
`;
