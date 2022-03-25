import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { List } from './Statuses.style';

import { getStatuses } from '/frontend/store/status/selectors';

import MockStatuses from './Mock';
import Status from './Status';

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    if (!statuses || statuses.length === 0) {
        return <MockStatuses />;
    }

    return (
        <List>
            {statuses.map((status) => (
                <Status key={status.id} status={status} />
            ))}
        </List>
    );
};

export default Statuses;
