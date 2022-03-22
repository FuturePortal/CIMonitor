import { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { stateColor } from '/frontend/style/colors';

import { State } from '/types/status';

type Props = {
    icon: string;
    state?: State;
    title?: string;
};

type SpanProps = {
    state?: State;
};

const Span = styled.span<SpanProps>`
    ${(props) =>
        props.state &&
        css`
            color: ${stateColor[props.state]};
        `}
`;

const Icon = ({ icon, state, title }: Props): ReactElement => {
    const classes = ['icon'];

    if (['autorenew'].includes(icon)) {
        classes.push('spin');
    }

    return (
        <Span state={state} className={classes.join(' ')} title={title || ''}>
            {icon}
        </Span>
    );
};

export default Icon;
