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
    key: string;
    project: string;
    state: State;
    time: Date;
    title?: string; // MR/PR name?
    source?: 'github' | 'gitlab';
    branch?: string;
    tag?: string;
    issue?: number;
    projectImage?: string;
    userImage?: string;
    processes?: Process[];
};

export default Status;
