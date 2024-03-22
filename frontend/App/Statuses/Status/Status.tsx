import { ReactElement, useState } from 'react';

import { Body, Box, Boxes, Container, Details, LinkBox, Project, ProjectImage, UserImage } from './Status.style';

import RunTime from '/frontend/App/Statuses/Status/RunTime';
import Icon from '/frontend/components/Icon';
import useSetting from '/frontend/hooks/useSetting';

import Merge from './Merge';
import Process from './Process';
import Source from './Source';
import TimePassed from './TimePassed';
import User from './User';

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
	const showAvatars = useSetting('showAvatars');
	const [projectAvatarFailed, setProjectAvatarFailed] = useState(false);

	const activeProcess = status.processes[0] || null;

	return (
		<Container key={status.id} state={status.state}>
			<Body>
				{status.projectImage && !projectAvatarFailed && (
					<ProjectImage
						src={status.projectImage}
						alt={status.project}
						onError={() => setProjectAvatarFailed(true)}
					/>
				)}
				{!!status.userImage && showAvatars && <UserImage src={status.userImage} alt={status.username} />}
				<Details>
					<Project>{status.project}</Project>
					<Boxes>
						<Source type={status.source} url={status.sourceUrl} />
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
						<Merge title={status.mergeTitle} url={status.mergeUrl} />
						{status.url && (
							<LinkBox href={status.url} target="_blank" rel="nofollow">
								<Icon icon="launch" /> {pettyUrl(status.url)}
							</LinkBox>
						)}
						<User username={status.username} url={status.userUrl} />
						<Box>
							<Icon icon="schedule" /> <TimePassed since={status.time} />
							{!!activeProcess && (
								<>
									{' '}
									<RunTime duration={activeProcess.duration} />
								</>
							)}
						</Box>
					</Boxes>
				</Details>
			</Body>
			{status.processes && status.processes.map((process) => <Process key={process.id} process={process} />)}
		</Container>
	);
};

export default Statuses;
