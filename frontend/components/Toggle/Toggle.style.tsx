import styled, { css } from 'styled-components';

import { stateColor, textMutedColor } from '/frontend/style/colors';

export const Switch = styled.div`
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: ${textMutedColor};
    transition: right 300ms, background-color 300ms;
`;

type ButtonProps = {
    enabled: boolean;
};

export const Button = styled.button<ButtonProps>`
    position: relative;
    border: 0.15rem solid ${textMutedColor};
    width: 4rem;
    height: 2rem;
    border-radius: 1rem;
    transition: border-color 300ms;
    margin-bottom: 0.8rem;

    &::after {
        content: 'off';
        position: absolute;
        top: 1.8rem;
        left: 0;
        width: 4rem;
        text-align: center;
    }

    ${(props) =>
        props.enabled &&
        css`
            border-color: ${stateColor.success};

            &::after {
                content: 'on';
            }

            ${Switch} {
                background: ${stateColor.success};
                right: 2.1rem;
            }
        `}
`;
