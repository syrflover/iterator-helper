import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

const logger = await getLogger('methods/collect');

export function collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
    logger.trace('collect()');
    return fold((acc: T[], e: T) => [...acc, e], [] as T[], iter);
}
