import Status, { Duration, Process, Stage, State, StepAndStageState } from 'types/status';

const statusesExpire = 60 * 60 * 24 * 7; // 7 days
const statusesTimeout = 60 * 60 * 2; // 2 hours

const isExpired = (time: string, expireAfterSeconds: number): boolean => {
	const expiredTime = new Date().getTime() - expireAfterSeconds * 1000;

	return new Date(time).getTime() < expiredTime;
};

export const getExpiredStatuses = (statuses: Status[]): Status[] =>
	statuses.filter((status) => isExpired(status.time, statusesExpire));

export const getStuckStatuses = (statuses: Status[]): Status[] =>
	statuses.filter((status) => {
		for (let process of status.processes) {
			for (let stage of process.stages) {
				if (stage.state === 'running' && isExpired(stage.time, statusesTimeout)) {
					return true;
				}

				for (let step of stage.steps) {
					if (step.state === 'running' && isExpired(step.time, statusesTimeout)) {
						return true;
					}
				}
			}

			if (
				process.state === 'warning' &&
				isExpired(process.time, statusesTimeout) &&
				// when there is a pending stage, the process is not stuck running
				!process.stages.find((stage) => stage.state === 'pending')
			) {
				return true;
			}
		}

		return false;
	});

export const getGlobalState = (statuses: Status[]): State => {
	if (statuses.find((status) => status.state === 'warning')) {
		return 'warning';
	}

	if (statuses.find((status) => status.state === 'error')) {
		return 'error';
	}

	if (statuses.find((status) => status.state === 'success')) {
		return 'success';
	}

	return 'info';
};

export const processStatusChanges = (status: Status): Status => {
	const processes = status.processes
		// Sort processes by creation time
		.sort(
			(processA: Process, processB: Process): number =>
				new Date(processB.time).getTime() - new Date(processA.time).getTime()
		)
		// Remove all processes that are not the latest or not warning
		.filter((process, index) => index === 0 || process.state === 'warning');

	return {
		...status,
		state: determineStatusState(processes),
		processes: patchProcessDurations(processes),
	};
};

const setDuration = (state: StepAndStageState | Process['state'], currentDuration?: Duration): Duration => {
	if (state === 'running' || state === 'warning') {
		return {
			ran: currentDuration?.ran || 0,
			start: currentDuration?.start ? currentDuration.start : new Date().toUTCString(),
		};
	}

	let duration = currentDuration?.ran || 0;
	if (currentDuration?.start) {
		duration += Math.abs(new Date(currentDuration.start).getTime() - new Date().getTime());
	}
	return {
		ran: duration,
	};
};

export const patchProcessDurations = (processes: Process[]): Process[] =>
	processes.map((process) => ({
		...process,
		stages: process.stages.map((stage) => ({
			...stage,
			steps: stage.steps.map((step) => ({
				...step,
				duration: setDuration(step.state, step.duration),
			})),
			duration: setDuration(stage.state, stage.duration),
		})),
		duration: setDuration(process.state, process.duration),
	}));

export const fixStuckStatus = (status: Status): Status => ({
	...status,
	processes: status.processes.map((process) => {
		const stages = process.stages.map((stage) => {
			const steps = stage.steps.map((step) => {
				if (step.state === 'running' && isExpired(step.time, statusesTimeout)) {
					step.state = 'timeout';
				}

				return step;
			});

			return {
				...stage,
				steps,
				state: stage.state === 'running' && isExpired(stage.time, statusesTimeout) ? 'timeout' : stage.state,
			};
		});

		return {
			...process,
			stages,
			state: determineTimeoutProcessState(stages),
		};
	}),
});

const determineStatusState = (processes: Process[]): State => {
	if (processes.find((processes) => processes.state === 'error')) {
		return 'error';
	}

	if (processes.find((processes) => processes.state === 'warning')) {
		return 'warning';
	}

	if (processes.find((processes) => processes.state === 'success')) {
		return 'success';
	}

	return 'info';
};

export const isOldProcess = (status: Status, processId: number): boolean => {
	if (status.processes.length === 0) {
		return false;
	}

	const latestProcessId = status.processes[0].id;

	return processId < latestProcessId;
};

const determineTimeoutProcessState = (stages: Stage[]): State => {
	if (stages.find((stage) => ['running'].includes(stage.state))) {
		return 'warning';
	}

	return 'error';
};
