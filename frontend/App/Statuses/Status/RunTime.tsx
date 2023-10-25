import { ReactElement, useEffect, useState } from 'react';

import { Duration } from '/types/status';

const getTimeRan = (milliseconds: number = 0, wrap: boolean) => {
	let seconds = Math.round(milliseconds / 1000);
	if (seconds === 0) {
		return '';
	}
	const minutes = Math.floor(seconds / 60);
	seconds = seconds - minutes * 60;

	const duration = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

	return wrap ? `(${duration})` : duration;
};

type Props = {
	duration?: Duration;
	noWrap?: boolean;
};

const RunTime = ({ duration, noWrap = false }: Props): ReactElement | null => {
	const [runDuration, setRunDuration] = useState(duration?.ran || 0);

	useEffect(() => {
		let intervalId = undefined;

		const updateTime = (duration: Duration) => {
			const ran = duration?.ran || 0;

			if (!duration?.start) {
				return ran;
			}

			setRunDuration(Math.abs(new Date(duration.start).getTime() - new Date().getTime()) + ran);
		};

		if (duration?.start) {
			intervalId = setInterval(() => updateTime(duration), 1000);
		}

		updateTime(duration);

		return () => clearInterval(intervalId);
	}, [duration, setRunDuration]);

	return <>{getTimeRan(runDuration, !noWrap)}</>;
};

export default RunTime;
