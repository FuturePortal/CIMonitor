export type State = 'info' | 'warning' | 'error' | 'success';

export type StepState = 'created' | 'pending' | 'running' | 'success' | 'failed' | 'soft-failed';

export type Step = {
    id: string;
    title: string;
    state: StepState;
    time: Date;
    duration?: number;
};

export type Stage = {
    id: string;
    title?: string;
    state: State;
    steps: Step[];
    time: Date;
};

export type Process = {
    id: string;
    title: string; // commit message?
    state: State;
    stages: Stage[];
    time: Date;
    duration?: number;
};

export type Status = {
    id: string;
    project: string;
    state: State;
    processes: Process[];
    time: Date;
    source: 'github' | 'gitlab';
    title?: string; // MR/PR name?
    branch?: string;
    tag?: string;
    issue?: number;
    projectImage?: string;
    userImage?: string;
};

export default Status;
