import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Box, Boxes, DeleteButton, Details, Header, Intro, Project, Status, Title } from './Statuses.style';
import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import { deleteAllStatuses, deleteStatus } from '/frontend/api/cimonitor';
import TimePassed from '/frontend/App/Statuses/Status/TimePassed';
import Alert from '/frontend/components/Alert';
import Icon from '/frontend/components/Icon';
import { getStatuses } from '/frontend/store/status/selectors';

const Statuses = (): ReactElement => {
	const statuses = useSelector(getStatuses);

	return (
		<Content>
			<Header>
				<Intro>
					<Title>Statuses</Title>
					Be aware that removing statuses is happening on all connected CIMonitors.
				</Intro>
				{statuses.length > 0 && (
					<DeleteButton onClick={() => deleteAllStatuses()}>
						<Icon icon="delete_forever" /> delete all
					</DeleteButton>
				)}
			</Header>
			{statuses.length === 0 && (
				<Alert state="success">
					There are no statuses yet to display. Trigger a webhook to push now statuses to your dashboard.
				</Alert>
			)}
			{statuses.map((status) => (
				<Status key={status.id} state={status.state}>
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
					<DeleteButton onClick={() => deleteStatus(status.id)}>
						<Icon icon="delete_outline" /> delete
					</DeleteButton>
				</Status>
			))}
		</Content>
	);
};

export default Statuses;
