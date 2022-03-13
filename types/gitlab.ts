export type GitLabPipeline = {
    object_kind: 'pipeline';
};

export type GitLabUser = {
    id: number;
    name: string;
    username: string;
    avatar_url: string;
    email: string;
};

export type GitLabCommit = {
    id: number;
    sha: string;
    message: string;
    author_name: string;
    author_email: string;
    author_url: string;
    status: string;
    duration: string | null;
    started_at: string | null;
    finished_at: string | null;
};

export type GitLabRepository = {
    name: string;
    url: string;
    description: string;
    homepage: string;
    git_http_url: string;
    git_ssh_url: string;
    visibility_level: number;
};

export type GitLabEnvironment = {
    name: string;
    action: string;
};

export type GitLabBuild = {
    object_kind: 'build';
    ref: string | false;
    tag: string | false;
    sha: string;
    before_sha: string;
    build_id: number;
    build_name: string;
    build_stage: string;
    build_status: string;
    build_created_at: string;
    build_started_at: string | null;
    build_finished_at: string | null;
    build_duration: string | null;
    build_queued_duration: string | null;
    build_allow_failure: boolean;
    build_failure_reason: string;
    pipeline_id: number;
    runner: string | null;
    project_id: number;
    project_name: string;
    user: GitLabUser;
    commit: GitLabCommit;
    repository: GitLabRepository;
    environment: GitLabEnvironment | null;
};

export type GitLabWebhook = GitLabBuild | GitLabPipeline;

export default GitLabWebhook;
