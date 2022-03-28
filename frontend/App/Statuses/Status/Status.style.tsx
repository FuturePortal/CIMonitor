import styled from 'styled-components';

import { stateColor, stateDarkColor, textColor } from '/frontend/style/colors';
import { ellipsis, ellipsisLeft } from '/frontend/style/text';

import { State } from '/types/status';

const imageSize = '6rem';

export const Boxes = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.25rem;
`;

export const Box = styled.div`
    padding: 0.3rem 0.5rem;
    border-radius: 0.25rem;
    ${ellipsis};
`;

export const LinkBox = styled.a`
    padding: 0.3rem 0.5rem;
    border-radius: 0.25rem;
    text-decoration: none;
    color: ${textColor};
    ${ellipsis};
`;

export const Details = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 5rem;
`;

export const Project = styled.h1`
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    ${ellipsisLeft};
`;

type StatusProps = {
    state: State;
};

export const Container = styled.div<StatusProps>`
    background: ${(props) => stateColor[props.state]};
    color: #222222;
    margin-bottom: 1rem;
    max-width: 100%;
    overflow: hidden;

    ${Box}, ${LinkBox} {
        background: ${(props) => stateDarkColor[props.state]};

        svg {
            transform: translatey(0.25rem) scale(1.4);
            height: 1rem;
            fill: ${textColor};
        }
    }

    ${LinkBox}:hover {
        background: ${textColor} !important;
        color: ${(props) => stateDarkColor[props.state]};

        svg {
            fill: ${(props) => stateDarkColor[props.state]};
        }
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Body = styled.div`
    padding: 1rem 1rem 0 1rem;
    display: flex;
`;

export const UserImage = styled.div`
    img {
        border-radius: 50%;
        max-width: ${imageSize};
        max-height: ${imageSize};
    }
`;
