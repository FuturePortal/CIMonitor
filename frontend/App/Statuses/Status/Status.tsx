import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Body, Box, Boxes, Container, Details, LinkBox, Project, UserImage } from './Status.style';

import Icon from '/frontend/components/Icon';
import { isHidingUserAvatars } from '/frontend/store/settings/selectors';

import Merge from './Merge';
import Process from './Process';
import ProjectImage from './ProjectImage';
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
	const hideUserAvatar = useSelector(isHidingUserAvatars);

	return (
		<Container key={status.id} state={status.state}>
			<Body>
				{status.projectImage && <ProjectImage url={status.projectImage} alt="Project image" />}
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
							<LinkBox href={status.url} target="_blank">
								<Icon icon="launch" /> {pettyUrl(status.url)}
							</LinkBox>
						)}
						<User username={status.username} url={status.userUrl} />
						<Box>
							<Icon icon="schedule" /> <TimePassed since={status.time} />
						</Box>
					</Boxes>
				</Details>
				{status.userImage && !hideUserAvatar && (
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
