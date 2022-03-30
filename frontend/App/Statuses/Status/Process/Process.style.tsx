import styled, { css } from 'styled-components';

import { stateColor, stateDarkColor } from '/frontend/style/colors';
import { ellipsis } from '/frontend/style/text';

import { State, StepState } from '/types/status';

type ProcessContainerProps = {
    state: State;
};

export const ProcessContainer = styled.div<ProcessContainerProps>`
    padding: 0 1rem 1rem 1rem;
    background: ${(props) => stateColor[props.state]};
`;

export const Stages = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

type StageProps = {
    state: StepState;
};

export const Stage = styled.div<StageProps>`
    background: ${(props) => stateDarkColor[props.state]};
    padding: 0.3rem 0.5rem;
    font-size: 1.5rem;
    ${ellipsis};

    ${(props) =>
        ['running', 'pending'].includes(props.state) &&
        css`
            background: ${stateDarkColor['warning']};
        `}

    ${(props) =>
        props.state === 'failed' &&
        css`
            background: ${stateDarkColor['error']};
        `}
`;

type StepProps = {
    state: StepState;
};

export const Step = styled.div<StepProps>`
    background: ${(props) => stateDarkColor[props.state]};
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    margin: 0.5rem 0.5rem 0 0;
    ${ellipsis};

    ${(props) =>
        ['running', 'pending', 'soft-failed'].includes(props.state) &&
        css`
            background: ${stateDarkColor['warning']};
        `}

    ${(props) =>
        props.state === 'failed' &&
        css`
            background: ${stateDarkColor['error']};
        `}
`;

export const StageContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 4rem;

    &:first-child ${Stage} {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    &:last-child {
        ${Stage} {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
        }

        ${Step} {
            margin-right: 0;
        }
    }
`;

export const Details = styled.div``;
