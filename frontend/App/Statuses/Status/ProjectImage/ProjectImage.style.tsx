import styled, { css } from 'styled-components';

import { fromSize } from '/frontend/style/size';

export const ProjectAvatar = styled.img`
	border-radius: 0.25rem;
	width: 3rem;
	height: 3rem;
	grid-row: 1;
	grid-column: 1;

	${fromSize.medium(css`
		width: 6rem;
		height: 6rem;
	`)}
`;
