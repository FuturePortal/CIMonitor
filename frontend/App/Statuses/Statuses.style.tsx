import styled from 'styled-components';

export const List = styled.div`
	height: 100vh;
	overflow: auto;
	padding-bottom: 4.2rem;

	// Hide scrollbar in FireFox
	scrollbar-width: none;

	// Hide scrollbar in webkit browsers
	&::-webkit-scrollbar {
		display: none;
	}
`;
