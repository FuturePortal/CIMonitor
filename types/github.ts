export type GitHubStatus = 'queued' | 'completed' | 'in_progress';

export type GitHubConclusion = null | 'success' | 'failure' | 'skipped';

type GitHubRepository = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    owner: {
        name: string;
        id: number;
        avatar_url: string;
    };
};

export type GitHubUser = {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
};

export type GitHubRelease = {
    tag_name: string;
    name: string;
    target_commitish: string;
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
        head_commit: {
            message: string;
        };
    };
    workflow: {
        name: string;
    };
    repository: GitHubRepository;
    organization: GitHubOrganization;
    sender: GitHubSender;
};

export type GitHubPullRequest = {
    action: 'opened';
    number: number;
    pull_request: {
        html_url: string;
        title: string;
        state: 'open';
        number: number;
        user: GitHubUser;
        head: {
            label: string;
            ref: string;
            user: GitHubUser;
        };
    };
    repository: GitHubRepository;
    organization: GitHubOrganization;
    sender: GitHubUser;
};

export type GitHubContributor = {
    total: number;
    author: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
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
