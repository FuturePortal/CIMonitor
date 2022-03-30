import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Body, Box, Boxes, Container, Details, LinkBox, Project, UserImage } from './Status.style';

import Icon from '/frontend/components/Icon';
import { getSizeModifier } from '/frontend/store/settings/selectors';

import Process from './Process';
import ProjectImage from './ProjectImage';
import Source from './Source';
import TimePassed from './TimePassed';

import Status from '/types/status';

type Props = {
    status: Status;
};

const pettyUrl = (url: string) =>
    String(url)
        // strip http(s)://
        .replace(/^http[s]?:\/\//, '')
        // strip / on the end
        .replace(/\/$/, '');

const Statuses = ({ status }: Props): ReactElement => {
    const sizeModifier = useSelector(getSizeModifier);

    return (
        <Container key={status.id} state={status.state} style={{ fontSize: `${sizeModifier}rem` }}>
            <Body>
                {status.projectImage && <ProjectImage url={status.projectImage} alt="Project image" />}
                <Details>
                    <Project>{status.project}</Project>
                    <Boxes>
                        <Source type={status.source} url={status.source_url} />
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
                        {status.url && (
                            <LinkBox href={status.url} target="_blank">
                                <Icon icon="launch" /> {pettyUrl(status.url)}
                            </LinkBox>
                        )}
                        <Box>
                            <Icon icon="schedule" /> <TimePassed since={status.time} />
                        </Box>
                    </Boxes>
                </Details>
                {status.userImage && (
                    <UserImage>
                        <img src={status.userImage} alt="User" />
                    </UserImage>
                )}
            </Body>
            {status.processes && status.processes.map((process) => <Process key={process.id} process={process} />)}
        </Container>
    );
};

export default Statuses;
