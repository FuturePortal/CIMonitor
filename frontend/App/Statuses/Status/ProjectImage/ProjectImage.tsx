import { ReactElement, useState } from 'react';

import { ProjectAvatar } from './ProjectImage.style';

type Props = {
	url: string;
	alt: string;
};

const ProjectImage = ({ url, alt }: Props): ReactElement | null => {
	const [isNotLoading, setNotLoading] = useState(false);

	if (isNotLoading) {
		return null;
	}

	return <ProjectAvatar src={url} alt={alt} onError={() => setNotLoading(true)} />;
};

export default ProjectImage;
