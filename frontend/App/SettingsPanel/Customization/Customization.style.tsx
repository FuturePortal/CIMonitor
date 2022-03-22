import styled from 'styled-components';

import { textMutedColor } from '/frontend/style/colors';

export const Setting = styled.div`
    border-top: 2px solid #f0f0f0;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const About = styled.div`
    flex-grow: 1;
    line-height: 1.4;
`;

export const Title = styled.div`
    font-size: 1.4rem;
`;

export const Description = styled.div`
    color: ${textMutedColor};
    font-size: 1rem;
`;

export const Tool = styled.div`
    flex-shrink: 0;
`;
