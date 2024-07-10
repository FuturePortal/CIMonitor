import Slugify from 'backend/parser/slug';
import { BitBucketChangeWrapper, BitBucketPush, BitBucketRepository } from 'types/bitbucket';
import Status from 'types/status';

import BitBucketPushParser from './push';

class BitBucketParser {
	getInternalId(repository: BitBucketRepository, branch: string): string {
		return `bitbucket-${Slugify(repository.full_name)}-${Slugify(branch)}`;
	}

	parsePush(push: BitBucketPush): Status {
		console.log('[parser/bitbucket] Parsing push...');

		const relevantChange = push.push.changes.find((changes: BitBucketChangeWrapper) => {
			if (changes.new) {
				return changes.new.type === 'branch' || changes.new.type === 'tag';
			}

			return false;
		});

		if (!relevantChange) {
			console.log('[parser/bitbucket] No relevant change of type branch was found. Stopping.');
			throw 'No relevant change was found :(';
		}

		const id = this.getInternalId(push.repository, relevantChange.new.name);

		return BitBucketPushParser.parse(id, push, relevantChange.new);
	}
}

export default new BitBucketParser();
