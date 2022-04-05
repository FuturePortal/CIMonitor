import { css } from 'styled-components';

type BreakPoints = {
    small: number;
    medium: number;
    large: number;
    huge: number;
};

export const breakpoints: BreakPoints = {
    small: 40,
    medium: 60,
    large: 80,
    huge: 100,
};

type BreakpointKeys = keyof BreakPoints;
// eslint-disable-next-line no-unused-vars
type Media = { [key in BreakpointKeys]: (cssString: ReturnType<typeof css>) => string };

export const fromSize: Media = Object.entries(breakpoints).reduce((acc, [label, size]: [string, number]) => {
    return {
        ...acc,
        [label]: (content: string) => css`
            @media (min-width: ${size}rem) {
                ${content}
            }
        `,
    };
}, {}) as Media;
