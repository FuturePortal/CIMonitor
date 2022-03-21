import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Body, Box, Boxes, Details, List, Project, ProjectImage, Status, UserImage } from './Statuses.style';

import Icon from '/frontend/components/Icon';
import { getStatuses } from '/frontend/store/status/selectors';

import MockStatuses from './Mock';
import Processes from './Processes';
import TimePassed from './TimePassed';

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    if (!statuses || statuses.length === 0) {
        return <MockStatuses />;
    }

    return (
        <List>
            {statuses.map((status) => (
                <Status key={status.id} state={status.state}>
                    <Body>
                        {status.projectImage && (
                            <ProjectImage>
                                <img src={status.projectImage} alt="project image" />
                            </ProjectImage>
                        )}
                        <Details>
                            <Project>{status.project}</Project>
                            <Boxes>
                                <Box>
                                    <Icon icon="code" /> {status.source}
                                </Box>
                                {status.branch && (
                                    <Box>
                                        <Icon icon="commit" /> {status.branch}
                                    </Box>
                                )}
                                {status.tag && (
                                    <Box>
                                        <Icon icon="bookmark_border" /> {status.tag}
                                    </Box>
                                )}
                                <Box>
                                    <Icon icon="schedule" /> <TimePassed since={status.time} />
                                </Box>
                            </Boxes>
                        </Details>
                        {status.userImage && (
                            <UserImage>
                                <img src={status.userImage} alt="user image" />
                            </UserImage>
                        )}
                    </Body>
                    <Processes processes={status.processes} />
                </Status>
            ))}
        </List>
    );
};

export default Statuses;
