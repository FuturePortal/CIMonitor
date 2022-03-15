import styled from 'styled-components';
import { State } from 'types/status';
import { stateColor } from '/frontend/style/colors';

const imageSize = '6rem';

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
    padding: 1rem 1rem 0 1rem;
    display: flex;
`;

export const Details = styled.div`
    flex-grow: 1;
`;

export const ProjectImage = styled.div`
    margin-right: 1rem;

    img {
        border-radius: 0.25rem;
        max-width: ${imageSize};
        max-height: ${imageSize};
    }`;

export const UserImage = styled.div`
    img {
        border-radius: 50%;
        max-width: ${imageSize};
        max-height: ${imageSize};
    }
`;
