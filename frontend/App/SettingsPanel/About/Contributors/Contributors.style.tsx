import styled from 'styled-components';

import { stateColor, textMutedColor } from '/frontend/style/colors';

export const Contributor = styled.div`
    border-top: 2px solid #f0f0f0;
    padding: 1rem 0;
    display: flex;
    align-items: center;
`;

export const Image = styled.img`
    background: #f0f0f0;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
`;

export const Details = styled.div`
    padding-left: 1rem;
    line-height: 1.3;
`;

export const ProfileLink = styled.a`
    display: block;
    text-decoration: none;
`;

export const Name = styled.div`
    font-size: 1.3rem;
`;

export const Location = styled.div`
    color: ${textMutedColor};
`;

export const Handle = styled.span`
    color: ${textMutedColor};
    padding-left: 0.3rem;
`;

export const Contributions = styled.a`
    display: block;
    color: ${stateColor.success};
`;
