import { css } from 'styled-components';

export const ellipsis = css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const ellipsisLeft = css`
	${ellipsis};
	direction: rtl;
	text-align: left;
`;
