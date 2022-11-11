import { GitLabStatus } from 'types/gitlab';
import { State, StepState } from 'types/status';

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

export const statusToStepState = (status: GitLabStatus, allowFailure: boolean): StepState => {
	const states: GitLabStatusMapper<StepState> = {
		pending: 'pending',
		running: 'running',
		created: 'created',
		canceled: 'stopped',
		failed: allowFailure ? 'soft-failed' : 'failed',
		success: 'success',
	};

	return states[status] || 'created';
};
