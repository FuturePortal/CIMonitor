import styled, { css } from 'styled-components';

import { stateColor, stateDarkColor, textColor } from '/frontend/style/colors';

export const Overlay = styled.div`
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.3);
    border: 0;
    outline: 0;
`;

export const Frame = styled.div`
    background: #fff;
    color: ${textColor};
    width: 65rem;
    max-width: 100%;
    margin: 1rem 1rem;
    height: calc(100vh - 15rem);
    max-height: 65rem;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const TitleBar = styled.div`
    display: flex;
    background: #333;
    height: 3rem;
    align-items: center;
    flex-shrink: 0;
`;

export const Title = styled.div`
    color: #fff;
    padding: 0 1rem;
    flex-grow: 1;
`;

export const Close = styled.button`
    font-size: 1.5rem;
    color: #fff;
    align-self: stretch;
    padding: 0 0.5rem;
    cursor: pointer;
`;

export const Tabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: ${stateColor.success};
`;

type TabProps = {
    active: boolean;
};

export const Tab = styled.button<TabProps>`
    padding: 0.8rem 1rem;

    ${(props) =>
        props.active &&
        css`
            background: ${stateDarkColor.success};
        `}
`;

export const Content = styled.div`
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
`;
