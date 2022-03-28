import { ReactElement, useState } from 'react';

import { Container } from './ProjectImage.style';

type Props = {
    url: string;
    alt: string;
};

const ProjectImage = ({ url, alt }: Props): ReactElement | null => {
    const [isNotLoading, setNotLoading] = useState(false);

    if (isNotLoading) {
        return null;
    }

    return (
        <Container>
            <img src={url} alt={alt} onError={() => setNotLoading(true)} />
        </Container>
    );
};

export default ProjectImage;
