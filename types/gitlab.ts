export type GitLabUser = {
	id: number;
	name: string;
	username: string;
	avatar_url: string;
	email: string;
};

export type GitLabEnvironment = {
	name: string;
	action: string;
};

export type GitLabProject = {
	id: number;
	name: string;
	description: string;
	web_url: string;
	avatar_url: string;
	git_ssh_url: string;
	git_http_url: string;
	namespace: string;
	visibility_level: number;
	path_with_namespace: string;
	default_branch: string;
	ci_config_path: null;
};

export type GitLabOther = {
	object_kind: 'other';
};

export type GitLabPipeline = {
	object_kind: 'pipeline';
	user: GitLabUser;
	object_attributes: {
		id: number;
		ref: string | false;
		tag: string | false;
		sha: string;
		before_sha: string;
		source: string;
		status: string;
		detailed_status: string;
		stages: string[];
		created_at: string;
		finished_at: string | null;
		duration: number | null;
		queued_duration: number | null;
	};
	project: GitLabProject;
	commit: {
		id: string;
		message: string;
		title: string;
		timestamp: string;
		url: string;
		author: {
			name: string;
			email: string;
		};
	};
};

export type GitLabDeployment = {
	object_kind: 'deployment';
	status: string;
	status_changed_at: string;
	deployment_id: number;
	deployable_id: number;
	deployable_url: string;
	environment: string;
	short_sha: string;
	user_url: string;
	commit_url: string;
	commit_title: string;
	ref: string;
	user: GitLabUser;
	project: GitLabProject;
};

export type GitLabMergeRequest = {
	object_kind: 'merge_request';
	user: GitLabUser;
	project: GitLabProject;
	object_attributes: {
		description: string;
		id: number;
		iid: number;
		source_branch: string;
		source_project_id: number;
		target_branch: string;
		target_project_id: number;
		title: string;
		url: string;
		source: GitLabProject;
		target: GitLabProject;
		last_commit: {
			title: string;
		};
		state: 'opened';
		action: 'open';
	};
	assignees: GitLabUser[];
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
	build_duration: number | null;
	build_queued_duration: number | null;
	build_allow_failure: boolean;
	build_failure_reason: string;
	pipeline_id: number;
	runner: string | null;
	project_id: number;
	project_name: string;
	user: GitLabUser;
	commit: {
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
	repository: {
		name: string;
		url: string;
		description: string;
		homepage: string;
		git_http_url: string;
		git_ssh_url: string;
		visibility_level: number;
	};
	environment: GitLabEnvironment | null;
};

export type GitLabWebhook = GitLabBuild | GitLabPipeline | GitLabDeployment | GitLabOther | GitLabMergeRequest;

export default GitLabWebhook;
