import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getStatuses } from '/frontend/store/status/selectors';
import { List, Body, Status, Details, ProjectImage, UserImage } from './Statuses.style';
import Processes from './Processes';
import TimePassed from './TimePassed'

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    return (
        <List>
            {statuses.length === 0 && <h1>Nothing yet.</h1>}
            {statuses.map((status) => (
                <Status key={status.id} state={status.state}>
                    <Body>
                        {status.projectImage && <ProjectImage><img src={status.projectImage} alt="project image" /></ProjectImage>}
                        <Details>
                            <h1>{status.project}</h1>
                            {status.source} {status.branch} {status.tag} <TimePassed since={status.time} />
                        </Details>
                        {status.userImage && <UserImage><img src={status.userImage} alt="user image" /></UserImage>}
                    </Body>
                    <Processes processes={status.processes} />
                </Status>
            ))}
        </List>
    );
};

export default Statuses;
