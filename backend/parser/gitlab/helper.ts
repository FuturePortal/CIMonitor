import { GitLabStatus } from 'types/gitlab';
import { State, StepAndStageState } from 'types/status';

type GitLabStatusMapper<ExpectedState> = {
	// eslint-disable-next-line no-unused-vars
	[K in GitLabStatus]: ExpectedState;
};

export const statusToState = (status: GitLabStatus): State => {
	const states: GitLabStatusMapper<State> = {
		pending: 'warning',
		running: 'warning',
		created: 'info',
		canceled: 'info',
		failed: 'error',
		success: 'success',
	};

	return states[status] || 'info';
};

export const statusToStepState = (status: GitLabStatus, allowFailure: boolean): StepAndStageState => {
	const states: GitLabStatusMapper<StepAndStageState> = {
		pending: 'pending',
		running: 'running',
		created: 'created',
		canceled: 'stopped',
		failed: allowFailure ? 'soft-failed' : 'failed',
		success: 'success',
	};

	return states[status] || 'created';
};
