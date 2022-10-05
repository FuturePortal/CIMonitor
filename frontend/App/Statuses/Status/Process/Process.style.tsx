import styled, { css } from 'styled-components';

import { opacity, stateColor, stateDarkColor } from '/frontend/style/colors';
import { fromSize } from '/frontend/style/size';
import { ellipsis } from '/frontend/style/text';

import { State, StepState } from '/types/status';

type ProcessContainerProps = {
	state: State;
};

export const ProcessContainer = styled.div<ProcessContainerProps>`
	padding: 0 0.75rem 0.75rem 0.75rem;
	background: ${(props) => stateColor[props.state]};
`;

export const Stages = styled.div`
	display: flex;
	margin-top: 0.4rem;
	font-size: 1.15em;
	flex-wrap: wrap;
	border-radius: 0.5rem;
	overflow: hidden;

	${fromSize.small(css`
		flex-wrap: nowrap;
	`)}
`;

type StageProps = {
	state: StepState;
	processState: State;
};

export const Stage = styled.div<StageProps>`
	background: ${(props) => stateDarkColor[props.state] || stateDarkColor.success};
	padding: 0.3rem 0.5rem;
	${ellipsis};

	${fromSize.small(css`
		width: auto;
	`)}

	${(props) =>
		['running'].includes(props.state) &&
		css`
			background: ${stateDarkColor['warning']};
		`}

    ${(props) =>
		['pending'].includes(props.state) &&
		css`
			background: ${opacity(stateDarkColor[props.processState], 0.5)};
		`}

    ${(props) =>
		['failed', 'timeout'].includes(props.state) &&
		css`
			background: ${stateDarkColor['error']};
		`}
`;

type StepProps = {
	state: StepState;
	processState: State;
};

export const Step = styled.div<StepProps>`
	background: ${(props) => stateDarkColor[props.state]};
	padding: 0.3rem 0.5rem 0.3rem 2.3rem;
	${ellipsis};

	${fromSize.small(css`
		border-radius: 0.5rem;
		margin: 0.5rem 0.5rem 0 0;
		padding: 0.3rem 0.5rem;
	`)};

	${(props) =>
		['running', 'soft-failed'].includes(props.state) &&
		css`
			background: ${stateDarkColor.warning};
		`}

	${(props) =>
		['pending', 'skipped'].includes(props.state) &&
		css`
			background: ${opacity(stateDarkColor[props.processState], 0.5)};
		`}

    ${(props) =>
		['failed', 'timeout'].includes(props.state) &&
		css`
			background: ${stateDarkColor.error};
		`}
`;

export const StageContainer = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
	min-width: 4rem;
	width: 100%;

	${fromSize.small(css`
		width: auto;

		&:first-child {
			${Stage} {
				border-bottom-left-radius: 0.5rem;
			}
		}

		&:last-child {
			${Stage} {
				border-bottom-right-radius: 0.5rem;
			}

			${Step} {
				margin-right: 0;
			}
		}
	`)}
`;

export const Details = styled.div`
	${ellipsis};
`;
