import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getStatuses } from '/frontend/store/status/selectors';
import { List, Status } from './Statuses.style';
import Processes from './Processes';

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    return (
        <List>
            {statuses.length === 0 && <h1>Nothing yet.</h1>}
            {statuses.map((status) => (
                <Status state={status.state}>
                    <h1>
                        {status.project}: {status.state}
                    </h1>
                    <p>
                        {status.source} {status.branch} {status.tag}
                    </p>
                    {status.userImage && <img src={status.userImage} alt="user image" />}
                    <Processes processes={status.processes} />
                </Status>
            ))}
        </List>
    );
};

export default Statuses;
