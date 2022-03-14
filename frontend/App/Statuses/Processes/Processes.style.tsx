import styled from 'styled-components';
import { State, StepState } from 'types/status';
import { stateColor } from '/frontend/style/colors';

type ProcessProps = {
    state: State;
};

export const Process = styled.div<ProcessProps>`
    background: ${(props) => stateColor[props.state]};
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
