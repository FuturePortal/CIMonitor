export type GitLabPipeline = {
    object_kind: 'pipeline';
};

export type GitLabBuild = {
    object_kind: 'build';
    ref: string;
};

export type GitLabWebhook = GitLabBuild | GitLabPipeline;

export default GitLabWebhook;
