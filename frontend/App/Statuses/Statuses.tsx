import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getStatuses } from '/frontend/store/status/selectors';
import { List, Body, Status } from './Statuses.style';
import Processes from './Processes';

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    return (
        <List>
            {statuses.length === 0 && <h1>Nothing yet.</h1>}
            {statuses.map((status) => (
                <Status key={status.id} state={status.state}>
                    <Body>
                        <h1>{status.project}</h1>
                        <p>
                            {status.source} {status.branch} {status.tag}
                        </p>
                        {status.userImage && <img src={status.userImage} alt="user image" />}
                        {status.projectImage && <img src={status.projectImage} alt="project image" />}
                    </Body>
                    <Processes processes={status.processes} />
                </Status>
            ))}
        </List>
    );
};

export default Statuses;
