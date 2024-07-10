// import Slugify from 'backend/parser/slug';
// import { GitHubPullRequest, GitHubPush, GitHubWorkflowJob, GitHubWorkflowRun } from 'types/github';
// import Status from 'types/status';
//
// import GitHubJobParser from './job';
// import GitHubPullRequestParser from './pull-request';
// import GitHubPushParser from './push';
// import GitHubRunParser from './run';

class BitBucketParser {
	// getInternalId(projectId: number, repositoryName: string, uniqueElement: string): string {
	// 	const base = `github-${projectId}-${Slugify(repositoryName)}`;
	//
	// 	return `${base}-${Slugify(uniqueElement.replace('refs/tags/', '').replace('refs/heads/', ''))}`;
	// }
	// parsePush(push: GitHubPush): Status {
	// 	console.log('[parser/github] Parsing push...');
	//
	// 	const id = this.getInternalId(push.repository.id, push.repository.name, push.ref);
	//
	// 	return GitHubPushParser.parse(id, push);
	// }
	// parseWorkflowRun(run: GitHubWorkflowRun): Status {
	// 	console.log('[parser/github] Parsing workflow run...');
	//
	// 	const id = this.getInternalId(run.repository.id, run.repository.name, run.workflow_run.head_branch);
	//
	// 	return GitHubRunParser.parse(id, run);
	// }
	//
	// parseWorkflowJob(job: GitHubWorkflowJob): Status | null {
	// 	console.log('[parser/github] Parsing workflow job...');
	//
	// 	return GitHubJobParser.parse(job);
	// }
	//
	// parsePullRequest(pullRequest: GitHubPullRequest): Status | null {
	// 	console.log('[parser/github] Parsing pull rquest...');
	//
	// 	const id = this.getInternalId(
	// 		pullRequest.repository.id,
	// 		pullRequest.repository.name,
	// 		pullRequest.pull_request.head.ref
	// 	);
	//
	// 	return GitHubPullRequestParser.parse(id, pullRequest);
	// }
}

export default new BitBucketParser();
