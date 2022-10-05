import { Fragment, ReactElement, useEffect, useState } from 'react';

import { Mock, Mocks } from './Mock.style';

import { State } from '/types/status';

const randomState = (): State => {
	const random = 100 * Math.random();

	if (random > 20) {
		return 'success';
	}

	if (random > 10) {
		return 'warning';
	}

	if (random > 5) {
		return 'error';
	}

	return 'info';
};

const getRandomMocks = (): ReactElement[] => {
	const mocks = [];

	for (let mockCount = 1; mockCount <= 20; mockCount++) {
		mocks.push(<Mock state={randomState()} />);
	}

	return mocks;
};

const MockStatuses = (): ReactElement => {
	const [mocks, setMocks] = useState<ReactElement[]>(getRandomMocks());

	useEffect(() => {
		const interval = setInterval(() => setMocks(getRandomMocks()), 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Mocks>
			{mocks.map((mock, index) => (
				<Fragment key={index}>{mock}</Fragment>
			))}
		</Mocks>
	);
};

export default MockStatuses;
