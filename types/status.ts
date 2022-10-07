export type State = 'info' | 'warning' | 'error' | 'success';

export type StepState =
	| 'created'
	| 'pending'
	| 'running'
	| 'success'
	| 'failed'
	| 'soft-failed'
	| 'skipped'
	| 'timeout';

export type Step = {
	id: string;
	title: string;
	state: StepState;
	time: string;
	duration?: number;
};

export type Stage = {
	id: string;
	title?: string;
	state: StepState;
	steps: Step[];
	time: string;
};

export type Process = {
	id: number;
	title: string;
	state: State;
	stages: Stage[];
	time: string;
	duration?: number;
};

export type Status = {
	id: string;
	project: string;
	state: State;
	processes: Process[];
	time: string;
	source: 'github' | 'gitlab' | 'readthedocs';
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
