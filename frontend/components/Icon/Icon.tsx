import { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { stateColor } from '/frontend/style/colors';

import { State } from '/types/status';

type Props = {
    icon: string;
    state?: State;
    title?: string;
};

const Icon = ({ icon, state, title }: Props): ReactElement => {
    const classes = ['icon'];

    if (['autorenew'].includes(icon)) {
        classes.push('spin');
    }

    const Span = styled.span`
        ${state &&
        css`
            color: ${stateColor[state]};
        `}
    `;

    return (
        <Span className={classes.join(' ')} title={title || ''}>
            {icon}
        </Span>
    );
};

export default Icon;
