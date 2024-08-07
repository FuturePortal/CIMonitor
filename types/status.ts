export type State = 'info' | 'warning' | 'error' | 'success';

export type StepAndStageState =
	| 'created'
	| 'pending'
	| 'running'
	| 'success'
	| 'failed'
	| 'soft-failed'
	| 'skipped'
	| 'timeout'
	| 'stopped';

export type Duration = {
	start?: string;
	ran: number;
};

export type Step = {
	id: string;
	title: string;
	state: StepAndStageState;
	time: string;
	duration?: Duration;
};

export type Stage = {
	id: string;
	title?: string;
	state: StepAndStageState;
	steps: Step[];
	time: string;
	duration?: Duration;
};

export type Process = {
	id: number;
	title: string;
	state: State;
	stages: Stage[];
	time: string;
	duration?: Duration;
};

export type Status = {
	id: string;
	project: string;
	state: State;
	processes: Process[];
	time: string;
	source: 'github' | 'gitlab' | 'readthedocs' | 'bitbucket';
	sourceUrl?: string;
	url?: string;
	branch?: string;
	tag?: string;
	issue?: number;
	projectImage?: string;
	username?: string;
	userImage?: string;
	userUrl?: string;
	mergeTitle?: string;
	mergeUrl?: string;
};

export default Status;
