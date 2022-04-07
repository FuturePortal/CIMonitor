import Status, { Process, Stage, State, Step, StepState } from 'types/status';

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
            if (process.state === 'warning' && isExpired(process.time, statusesTimeout)) {
                return true;
            }

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
        }

        return false;
    });

export const fixStatusStates = (status: Status): Status => {
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
        processes,
    };
};

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

            const stageState: StepState =
                stage.state === 'running' && isExpired(stage.time, statusesTimeout)
                    ? 'timeout'
                    : determineStageState(steps);

            return {
                ...stage,
                steps,
                state: stageState,
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

const determineTimeoutProcessState = (stages: Stage[]): State => {
    if (stages.find((stage) => ['running', 'pending'].includes(stage.state))) {
        return 'warning';
    }

    return 'error';
};

const determineStageState = (steps: Step[]): StepState => {
    if (steps.find((step) => ['running'].includes(step.state))) {
        return 'running';
    }

    if (steps.find((step) => ['created', 'pending'].includes(step.state))) {
        return 'pending';
    }

    if (steps.find((step) => ['timeout', 'failed'].includes(step.state))) {
        return 'failed';
    }

    return 'success';
};
