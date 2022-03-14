import styled from 'styled-components';
import { State } from 'types/status';
import { stateColor } from '/frontend/style/colors';

export const List = styled.div``;

type StatusProps = {
    state: State;
};

export const Status = styled.div<StatusProps>`
    background: ${(props) => stateColor[props.state]};
    color: #222222;
    margin-top: 1rem;

    &:first-child {
        margin-top: 0;
    }
`;

export const Body = styled.div`
    padding: 1rem;
`;
