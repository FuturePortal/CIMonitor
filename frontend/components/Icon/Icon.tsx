import { ReactElement } from 'react';

type Props = {
    icon: string;
};

const Icon = ({ icon }: Props): ReactElement => {
    const classes = ['icon'];

    if (['autorenew'].includes(icon)) {
        classes.push('spin');
    }

    return <span className={classes.join(' ')}>{icon}</span>;
};

export default Icon;
