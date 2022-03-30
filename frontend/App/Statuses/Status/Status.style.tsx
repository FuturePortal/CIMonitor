import styled from 'styled-components';

import { stateColor, stateDarkColor, textColor } from '/frontend/style/colors';
import { ellipsis, ellipsisLeft } from '/frontend/style/text';

import { State } from '/types/status';

export const Boxes = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
`;

export const Box = styled.div`
    font-size: 1.15em;
    padding: 0.3rem 0.5rem;
    border-radius: 0.25rem;
    ${ellipsis};
`;

export const LinkBox = styled.a`
    font-size: 1.15em;
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
    margin-bottom: 0.5rem;
    font-size: 2em;
    ${ellipsisLeft};
`;

type StatusProps = {
    state: State;
};

export const Container = styled.div<StatusProps>`
    background: ${(props) => stateColor[props.state]};
    color: ${textColor};
    margin-bottom: 1rem;
    max-width: 100%;
    overflow: hidden;

    ${Box}, ${LinkBox} {
        position: relative;
        background: ${(props) => stateDarkColor[props.state]};
        min-width: 1.6em;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.5em 0 0 -0.5em;
            height: 1em;
            width: 1em;
            fill: ${textColor};
            transform: scale(1.2);
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
    padding: 0.75rem;
    display: flex;
`;

export const UserImage = styled.div`
    flex-shrink: 0;

    img {
        border-radius: 50%;
        width: 6rem;
        height: 6rem;
    }
`;
