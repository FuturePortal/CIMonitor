import styled from 'styled-components';

const radius = 1.25;

const actionWidth = 16;
const actionHeight = 3.2;
const iconSize = 1.4;

export const brandSize = 5.5;
const brandHeight = 3.5;

export const Container = styled.div`
	position: fixed;
	z-index: 100;
	bottom: 0;
	left: 50%;
	width: ${actionWidth}rem;
	height: ${actionHeight}rem;
	background: #111;
	color: #222;
	margin-left: -${actionWidth / 2}rem;
	text-align: center;
	border-radius: ${radius}rem ${radius}rem 0 0;
	border-bottom: 0;
`;

export const Buttons = styled.div`
	position: absolute;
	z-index: 120;
	display: flex;
	width: 100%;
	height: ${actionHeight}rem;
	top: 0;
	left: 0;
	justify-content: space-between;
`;

export const Button = styled.button`
	background: transparent;
	color: #fff;
	border: 0;
	outline: 0;
	width: ${(actionWidth - brandSize) / 2}rem;
	font-size: ${iconSize}rem;
	cursor: pointer;
	transition: background 100ms;

	svg {
		fill: #fff;
		height: 1.5rem;
		transform: translateY(0.15rem);
	}

	&:first-child {
		border-top-left-radius: ${radius}rem;
	}

	&:last-child {
		border-top-right-radius: ${radius}rem;
	}

	&:hover {
		background: rgba(255, 255, 255, 0.05);
	}
`;

export const Brand = styled.div`
	position: fixed;
	z-index: 110;
	width: ${brandSize}rem;
	height: ${brandSize}rem;
	background: #fff;
	bottom: 0;
	left: 50%;
	margin-left: -${brandSize / 2}rem;
	border-radius: ${radius}rem ${radius}rem 0 0;
	display: flex;
	justify-content: center;
	align-items: center;

	&::after,
	&::before {
		width: ${radius}rem;
		height: ${radius}rem;
		background: transparent;
		bottom: 0;
		position: absolute;
		content: '';
		box-shadow: 0 0 0 50px #fff;
		clip: rect(0, ${radius}rem, ${radius}rem, 0);
		display: block;
	}

	&::after {
		right: -${radius}rem;
		border-bottom-left-radius: 100%;
	}

	&::before {
		left: -${radius}rem;
		border-bottom-right-radius: 100%;
	}

	svg {
		height: ${brandHeight}rem;
	}
`;
