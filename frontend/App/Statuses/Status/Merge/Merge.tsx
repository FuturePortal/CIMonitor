import { ReactElement } from 'react';

import { Box, LinkBox } from '/frontend/App/Statuses/Status/Status.style';

import Icon from '/frontend/components/Icon';

type Props = {
	title?: string;
	url?: string;
};

const Merge = ({ title, url }: Props): ReactElement | null => {
	if (!title && !url) {
		return null;
	}

	if (url) {
		return (
			<LinkBox href={url} target="_blank">
				<Icon icon="merge_type" /> {title || 'request'}
			</LinkBox>
		);
	}

	return (
		<Box>
			<Icon icon="merge_type" /> {title}
		</Box>
	);
};

export default Merge;
