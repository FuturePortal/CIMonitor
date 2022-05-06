import { ReactElement } from 'react';

import { Box, LinkBox } from '/frontend/App/Statuses/Status/Status.style';

import Icon from '/frontend/components/Icon';

type Props = {
    username?: string;
    url?: string;
};

const User = ({ username, url }: Props): ReactElement | null => {
    if (!username && !url) {
        return null;
    }

    if (url) {
        return (
            <LinkBox href={url} target="_blank">
                <Icon icon="person" /> {username || 'User'}
            </LinkBox>
        );
    }

    return (
        <Box>
            <Icon icon="merge_type" /> {username}
        </Box>
    );
};

export default User;
