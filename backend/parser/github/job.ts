import slug from 'backend/parser/slug';
import StatusManager from 'backend/status/manager';
import { GitHubWorkflowJob } from 'types/github';
import Status, { Process, Stage, State, Step, StepState } from 'types/status';

import { getJobStateFromStatus } from './helper';

class GitHubJobParser {
    parseJob(job: GitHubWorkflowJob): Status | null {
        const statuses = StatusManager.getStatuses();

        const processId = `run-${job.workflow_job.run_id}`;

        const targetStatus = statuses.find((status) => status.processes.find((process) => process.id === processId));

        if (!targetStatus) {
            console.log('[parser/github/job] No status with matching process is found, skipping update.');
            return null;
        }

        return {
            ...targetStatus,
            processes: targetStatus.processes.map((process) => {
                if (process.id === processId) {
                    return this.patchProcess(process, job);
                }

                return process;
            }),
            time: new Date().toUTCString(),
        };
    }

    patchProcess(process: Process, job: GitHubWorkflowJob): Process {
        const stageId = `job-${job.workflow_job.id}`;

        let stages = process.stages;

        if (!process.stages.find((stage) => stage.id === stageId)) {
            stages.push({
                id: stageId,
                title: job.workflow_job.name,
                state: getJobStateFromStatus(job.workflow_job.status, job.workflow_job.conclusion),
                steps: [],
                time: new Date().toUTCString(),
            });
        }

        stages = stages.map((stage) => {
            if (stage.id === stageId) {
                return this.patchStage(stage, job);
            }

            return stage;
        });

        return {
            ...process,
            stages,
            state: this.determineProcessState(stages),
            time: new Date().toUTCString(),
        };
    }

    determineProcessState(stages: Stage[]): State {
        if (stages.length === 0) {
            return 'warning';
        }

        if (stages.find((stage) => ['running', 'pending'].includes(stage.state))) {
            return 'warning';
        }

        if (stages.find((stage) => stage.state === 'failed')) {
            return 'error';
        }

        return 'success';
    }

    patchStage(stage: Stage, job: GitHubWorkflowJob): Stage {
        let steps = stage.steps;

        for (let step of job.workflow_job.steps) {
            const stepId = slug(step.name);

            if (!steps.find((step) => step.id === stepId)) {
                if (!['set-up-job', 'complete-job', 'checkout-branch', 'post-checkout-branch'].includes(stepId)) {
                    steps.push({
                        id: stepId,
                        title: step.name,
                        state: getJobStateFromStatus(step.status, step.conclusion),
                        time: new Date().toUTCString(),
                    });
                }
            }
        }

        steps = steps.map((stageStep) => {
            const jobStep = job.workflow_job.steps.find((jobStep) => slug(jobStep.name) === stageStep.id);

            if (jobStep) {
                return {
                    ...stageStep,
                    state: getJobStateFromStatus(jobStep.status, jobStep.conclusion),
                    time: new Date().toUTCString(),
                };
            }

            return stageStep;
        });

        return {
            ...stage,
            steps,
            state: this.determineStageState(steps),
            time: new Date().toUTCString(),
        };
    }

    determineStageState(steps: Step[]): StepState {
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
