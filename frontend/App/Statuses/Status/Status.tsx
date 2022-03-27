import { ReactElement } from 'react';

import { Body, Box, Boxes, Container, Details, LinkBox, Project, ProjectImage, UserImage } from './Status.style';

import Icon from '/frontend/components/Icon';

import Process from './Process';
import TimePassed from './TimePassed';

import Status from '/types/status';

type Props = {
    status: Status;
};

const getSource = (source: string, url: string | null = null): ReactElement =>
    url ? (
        <LinkBox href={url} target="_blank">
            <Icon icon="code" /> {source}
        </LinkBox>
    ) : (
        <Box>
            <Icon icon="code" /> {source}
        </Box>
    );

const Statuses = ({ status }: Props): ReactElement => (
    <Container key={status.id} state={status.state}>
        <Body>
            {status.projectImage && (
                <ProjectImage>
                    <img src={status.projectImage} alt="project image" />
                </ProjectImage>
            )}
            <Details>
                <Project>{status.project}</Project>
                <Boxes>
                    {getSource(status.source, status.source_url)}
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
                            <Icon icon="launch" /> {String(status.url).replace(/^http[s]?:\/\//, '')}
                        </LinkBox>
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
        {status.processes && status.processes.map((process) => <Process key={process.id} process={process} />)}
    </Container>
);

export default Statuses;
