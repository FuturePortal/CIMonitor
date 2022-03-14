import Status from 'types/status';
import { GitLabBuild, GitLabPipeline } from 'types/gitlab';
import Slugify from 'backend/parser/slug';
import GitLabBuildParser from './build';
import GitLabPipelineParser from './pipeline';

class GitLabParser {
    getInternalId(projectId: number, repositoryName: string, branch: string | false, tag: string | false): string {
        let id = `gitlab-${projectId}-${Slugify(repositoryName)}`;

        if (branch) {
            id += `-${Slugify(branch)}`;
        }

        if (tag) {
            id += `-${Slugify(tag)}`;
        }

        return id;
    }

    parseBuild(build: GitLabBuild): Status {
        console.log('[parser/gitlab] Parsing build...');

        const id = this.getInternalId(build.project_id, build.repository.name, build.ref, build.tag);

        return GitLabBuildParser.parseBuild(id, build);
    }

    parsePipeline(pipeline: GitLabPipeline): Status {
        const id = this.getInternalId(
            pipeline.project.id,
            pipeline.project.name,
            pipeline.object_attributes.ref,
            pipeline.object_attributes.tag
        );

        return GitLabPipelineParser.parsePipeline(id, pipeline);
    }
}

export default new GitLabParser();
