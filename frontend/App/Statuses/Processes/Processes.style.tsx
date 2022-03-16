import styled, { css } from 'styled-components';

import { stateColor, stateDarkColor } from '/frontend/style/colors';
import { State, StepState } from 'types/status';

type ProcessProps = {
    state: State;
};

export const Process = styled.div<ProcessProps>`
    padding: 1rem;
    background: ${(props) => stateColor[props.state]};
`;

export const Stages = styled.div`
    display: flex;
`;

type StageProps = {
    state: StepState;
};

export const Stage = styled.div<StageProps>`
    background: ${(props) => stateDarkColor[props.state]};
    padding: 0.3rem 0.5rem;

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
    margin-top: 0.5rem;
    margin-right: 0.5rem;

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

export const StageWrapper = styled.div`
    flex-grow: 1;
    flex-shrink: 1;

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

export const Details = styled.div`
    margin-bottom: 0.5rem;
`;
