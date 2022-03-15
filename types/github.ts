export type GitHubStatus = 'queued' | 'completed' | 'in_progress';

export type GitHubConclusion = null | 'success' | 'failure';

type GitHubRepository = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        name: string;
        id: number;
        avatar_url: string;
    };
};

type GitHubSender = {
    login: string;
    avatar_url: string;
};

type GitHubOrganization = {
    login: string;
    id: number;
    avatar_url: string;
};

export type GitHubPush = {
    ref: string;
    repository: GitHubRepository;
    pusher: {
        name: string;
        email: string;
    };
    organization: GitHubOrganization;
    sender: GitHubSender;
};

export type GitHubWorkflowRun = {
    workflow_run: {
        id: number;
        name: string;
        head_branch: string;
        status: GitHubStatus;
        conclusion: GitHubConclusion;
        actor: {
            login: string;
        };
    };
    workflow: {
        name: string;
    };
    repository: GitHubRepository;
    organization: GitHubOrganization;
    sender: GitHubSender;
};

export type GitHubStep = {
    name: string;
    status: GitHubStatus;
    conclusion: GitHubConclusion;
};

export type GitHubWorkflowJob = {
    workflow_job: {
        id: number;
        run_id: number;
        name: string;
        status: GitHubStatus;
        conclusion: GitHubConclusion;
        steps: GitHubStep[];
    };
    repository: GitHubRepository;
    organization: GitHubOrganization;
    sender: GitHubSender;
};
