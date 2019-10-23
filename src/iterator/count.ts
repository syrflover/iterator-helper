import { logger } from '../logger';

export async function _count<T>(iter: AsyncIterable<T>): Promise<number> {
    logger.trace('iterator/count', '_count()');
    let count = 0;

    for await (const _ of iter) {
        count += 1;
    }

    return count;
}
