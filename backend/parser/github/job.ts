import Status, { Process, Stage, Step, StepState } from 'types/status';
import { GitHubWorkflowJob } from 'types/github';
import StatusManager from 'backend/status/manager';
import { getJobStateFromStatus } from 'backend/parser/github/status';
import slug from 'backend/parser/slug';

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
            time: new Date(),
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
                time: new Date(),
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
            time: new Date(),
        };
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
                        time: new Date(),
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
                };
            }

            return stageStep;
        });

        return {
            ...stage,
            steps,
            state: this.determineStageState(steps),
        };
    }

    determineStageState(steps: Step[]): StepState {
        if (steps.length === 0) {
            return 'running';
        }

        if (steps.find((step) => step.state === 'running')) {
            return 'running';
        }

        if (steps.find((step) => step.state === 'pending')) {
            return 'pending';
        }

        if (steps.find((step) => step.state === 'failed')) {
            return 'failed';
        }

        return 'success';
    }
}

export default new GitHubJobParser();
