import styled, { css } from 'styled-components';

import { stateColor, stateDarkColor, textColor } from '/frontend/style/colors';
import { fromSize } from '/frontend/style/size';
import { ellipsis, ellipsisLeft } from '/frontend/style/text';

import { State } from '/types/status';

export const Boxes = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
`;

export const Box = styled.div`
    position: relative;
    font-size: 1.15em;
    padding: 0.3rem 0.5rem;
    border-radius: 0.25rem;
    min-width: 1.6em;
    min-height: 2rem;
    ${ellipsis};

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -0.5em 0 0 -0.5em;
        height: 1em;
        width: 1em;
        transform: scale(1.2);
    }
`;

export const LinkBox = styled(Box).attrs({ as: 'a' })`
    text-decoration: none;
    color: ${textColor};
`;

export const Details = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 5rem;
`;

export const Project = styled.h1`
    margin-bottom: 0.5rem;
    font-size: 1.5em;
    ${ellipsisLeft};

    ${fromSize.small(css`
        font-size: 2em;
    `)}
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

    ${Box} {
        background: ${(props) => stateDarkColor[props.state]};

        svg {
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
