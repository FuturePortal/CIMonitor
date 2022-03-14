import styled from 'styled-components';
import { State, StepState } from 'types/status';
import { stateColor } from '/frontend/style/colors';

type ProcessProps = {
    state: State;
};

export const Process = styled.div<ProcessProps>`
    padding: 1rem;
    background: ${(props) => stateColor[props.state]};
`;

export const Stages = styled.div`
    display: flex;
    gap: 1rem;
`;

type StageProps = {
    state: State;
};

export const Stage = styled.div<StageProps>`
    background: ${(props) => stateColor[props.state]};
`;

type StepProps = {
    state: StepState;
};

export const Step = styled.div<StepProps>`
    background: ${(props) => stateColor[props.state]};
`;
