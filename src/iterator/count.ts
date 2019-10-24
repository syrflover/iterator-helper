import { getLogger } from '../logger';

const logger = getLogger('iterator/count');

export async function _count<T>(iter: AsyncIterable<T>): Promise<number> {
    logger.trace('_count()');
    let count = 0;

    for await (const _ of iter) {
        count += 1;
    }

    return count;
}
