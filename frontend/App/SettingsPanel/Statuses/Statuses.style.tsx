import styled from 'styled-components';

import { stateColor, stateLightColor } from '/frontend/style/colors';

import { State } from '/types/status';

export const DeleteButton = styled.button`
    padding: 0.5rem;
    transition: background-color 300ms;
    border-radius: 0.3rem;
    flex-shrink: 0;

    &:hover {
        background: ${stateColor.error};
    }
`;

type StatusProps = {
    state: State;
};

export const Intro = styled.div`
    flex-grow: 1;
    line-height: 1.4;
`;

export const Details = styled.div`
    flex-grow: 1;
    padding-left: 1rem;
    line-height: 1.4;
`;

export const Status = styled.div<StatusProps>`
    position: relative;
    padding: 1rem;
    margin: 0 -1rem;
    border-top: 2px solid #f0f0f0;
    display: flex;
    align-items: center;
    transition: background-color 300ms;

    ${Details}::before {
        content: ' ';
        position: absolute;
        top: 0.75rem;
        left: 1rem;
        height: auto;
        bottom: 0.75rem;
        width: 0.2rem;
        border-radius: 0.1rem;
        background: ${(props) => stateColor[props.state]};
    }

    &:hover {
        background: ${(props) => stateLightColor[props.state]};
    }
`;

export const Header = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const Title = styled.h1`
    margin-bottom: 0;
    flex-grow: 1;
`;

export const Project = styled.div`
    font-size: 1.3rem;
`;

export const Boxes = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Box = styled.div`
    font-size: 16px;
    flex-shrink: 0;
    margin-right: 0.5rem;
`;
