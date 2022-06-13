import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Contributions, Contributor, Details, Handle, Image, Location, Name, ProfileLink } from './Contributors.style';

import { fetchContributors } from '/frontend/store/cache/fetch';
import { getContributors } from '/frontend/store/cache/selectors';

import { Contributor as ContributorType } from '/types/cimonitor';

const Contributors = (): ReactElement => {
    const contributors = useSelector(getContributors);

    useEffect(() => {
        fetchContributors();
    }, []);

    if (contributors.length === 0) {
        return <>Fetching contributors...</>;
    }

    const getContributions = (contributor: ContributorType): string => {
        if (contributor.username === 'rick-nu') {
            return 'Creator and maintainer';
        }

        return `${contributor.commits} contribution${contributor.commits > 1 ? 's' : ''}`;
    };

    return (
        <>
            {contributors.map((contributor) => (
                <Contributor key={contributor.username}>
                    <ProfileLink href={contributor.profile} target="_blank">
                        <Image src={contributor.image} alt={contributor.name || contributor.username} />
                    </ProfileLink>
                    <Details>
                        <Name>
                            {contributor.name || contributor.username}{' '}
                            {contributor.name && <Handle>@{contributor.username}</Handle>}
                        </Name>
                        {contributor.location && <Location>{contributor.location}</Location>}
                        <Contributions
                            href={`https://github.com/CIMonitor/CIMonitor/commits?author=${contributor.username}`}
                            target="_blank"
                        >
                            {getContributions(contributor)}
                        </Contributions>
                    </Details>
                </Contributor>
            ))}
        </>
    );
};

export default Contributors;
