import styled from 'styled-components';

import { stateDarkColor } from '/frontend/style/colors';

const Log = styled.div`
	border-top: 2px solid #f0f0f0;
	padding: 1rem 0;
	display: flex;
`;

const Version = styled.div`
	width: 3.5rem;
	flex-shrink: 0;
	font-size: 1.2rem;
`;

const Description = styled.div`
	h1,
	h2,
	h3 {
		display: none;
	}
	ul {
		margin-bottom: 0;
	}
	a {
		color: ${stateDarkColor.success};
	}
`;

export default {
	Log,
	Version,
	Description,
};
