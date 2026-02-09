import styled from 'styled-components';

import { stateDarkColor, textColor } from '/frontend/style/colors';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Input = styled.input`
	padding: 0.75rem;
	border: 2px solid #ddd;
	border-radius: 0.5rem;
	font-size: 1rem;
	color: ${textColor};
	outline: none;
	transition: border-color 0.2s;

	&:focus {
		border-color: ${stateDarkColor.info};
	}

	&::placeholder {
		opacity: 0.5;
	}
`;

export const Button = styled.button`
	padding: 0.75rem;
	background: ${stateDarkColor.info};
	color: white;
	border: none;
	border-radius: 0.5rem;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: opacity 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	&:hover:not(:disabled) {
		opacity: 0.9;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;
