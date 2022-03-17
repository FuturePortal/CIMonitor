import styled from 'styled-components';

import { stateColor } from '/frontend/style/colors';
import { State } from 'types/status';

export const Mocks = styled.div`
    height: 100vh;
    overflow: hidden;
`;

type MockProps = {
    state: State;
};

export const Mock = styled.div<MockProps>`
    height: 10rem;
    background-color: ${(props) => stateColor[props.state]};
    margin-bottom: 1rem;
`;
