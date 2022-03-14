export type State = 'info' | 'warning' | 'danger' | 'success';

export type StepState = 'pending' | 'planned' | 'running' | 'success' | 'failed' | 'soft-failed';

export type Step = {
    title: string;
    state: StepState;
    time: Date;
    duration?: number;
};

export type Stage = {
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
    time: Date;
    source: 'github' | 'gitlab';
    title?: string; // MR/PR name?
    branch?: string;
    tag?: string;
    issue?: number;
    projectImage?: string;
    userImage?: string;
    processes?: Process[];
};

export default Status;
