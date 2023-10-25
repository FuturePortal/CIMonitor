import Slugify from 'backend/parser/slug';
import StatusManager from 'backend/status/manager';
import { GitHubWorkflowJob } from 'types/github';
import Status, { Process, Stage, Step, StepState } from 'types/status';

import { getStepState } from './helper';

class GitHubJobParser {
	parse(webhook: GitHubWorkflowJob): Status | null {
		const statuses = StatusManager.getStatuses();

		// Check if a matching workflow run exists
		const processId = webhook.workflow_job.run_id;
		const targetStatus = statuses.find((status) => status.processes.find((process) => process.id === processId));
		if (!targetStatus) {
			console.log('[parser/github/job] No status with matching process is found, skipping update.');
			return null;
		}

		return {
			...targetStatus,
			processes: targetStatus.processes.map((process) => {
				if (process.id === processId) {
					return this.patchProcess(process, webhook);
				}

				return process;
			}),
			time: new Date().toUTCString(),
		};
	}

	patchProcess(process: Process, webhook: GitHubWorkflowJob): Process {
		const stageName = webhook.workflow_job.name.split(' / ')[0];
		const stageId = `stage-${Slugify(stageName)}`;

		let stages = process.stages;

		if (!process.stages.find((stage) => stage.id === stageId)) {
			stages.push({
				id: stageId,
				title: stageName,
				state: getStepState(webhook.workflow_job.status, webhook.workflow_job.conclusion),
				steps: [],
				time: new Date().toUTCString(),
			});
		}

		stages = stages.map((stage) => {
			if (stage.id === stageId) {
				return this.patchStage(stage, webhook);
			}

			return stage;
		});

		return {
			...process,
			stages,
		};
	}

	patchStage(stage: Stage, webhook: GitHubWorkflowJob): Stage {
		let steps = stage.steps;

		const actionNameTree = webhook.workflow_job.name.split(' / ');
		if (actionNameTree.length <= 1) {
			return {
				...stage,
				state: getStepState(webhook.workflow_job.status, webhook.workflow_job.conclusion),
			};
		}

		const stepId = `step-${Slugify(webhook.workflow_job.name)}`;

		stage.title = actionNameTree[0];

		if (!steps.find((step) => step.id === stepId)) {
			steps.push({
				id: stepId,
				title: actionNameTree.slice(1).join(' / '),
				state: 'pending',
				time: new Date().toUTCString(),
			});
		}

		steps = steps.map((stageStep) => {
			if (stageStep.id === stepId) {
				return {
					...stageStep,
					state: getStepState(webhook.workflow_job.status, webhook.workflow_job.conclusion),
					time: new Date().toUTCString(),
				};
			}

			return stageStep;
		});

		return {
			...stage,
			steps,
			state: this.getStageState(steps),
			time: new Date().toUTCString(),
		};
	}

	getStageState(steps: Step[]): StepState {
		if (steps.length === 0) {
			return 'running';
		}

		if (steps.find((step) => ['running', 'pending'].includes(step.state))) {
			return 'running';
		}

		if (steps.find((step) => step.state === 'failed')) {
			return 'failed';
		}

		return 'success';
	}
}

export default new GitHubJobParser();
