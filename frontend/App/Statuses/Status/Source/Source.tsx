import { ReactElement } from 'react';

import { Box, LinkBox } from '/frontend/App/Statuses/Status/Status.style';

import GitHub from './icon/github.svg';
import GitLab from './icon/gitlab.svg';
import ReadTheDocs from './icon/readthedocs.svg';

import Icon from '/frontend/components/Icon';

type Props = {
    type: string;
    url?: string | null;
};

const Source = ({ type, url }: Props): ReactElement => {
    const getIcon = (type: string): ReactElement => {
        switch (type) {
            case 'gitlab':
                return <GitLab />;
            case 'github':
                return <GitHub />;
            case 'readthedocs':
                return <ReadTheDocs />;
            default:
                return (
                    <>
                        <Icon icon="code" /> {type}
                    </>
                );
        }
    };

    if (url) {
        return (
            <LinkBox href={url} target="_blank">
                {getIcon(type)}
            </LinkBox>
        );
    }

    return <Box>{getIcon(type)}</Box>;
};

export default Source;
