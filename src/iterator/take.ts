import { logger } from '../logger';

import { Iterator } from '../iterator';

export class IteratorTake<T> implements AsyncIterable<T> {
    constructor(iter: AsyncIterable<T>, count: number) {
        logger.trace('IteratorTake', 'constructor()');
        this._iter = iter;
        this.count = count;
    }

    public async *[Symbol.asyncIterator]() {
        logger.trace('IteratorTake', '[Symbol.asyncIterator]()');
        for await (const elem of this._iter) {
            logger.debug('elem    =', elem);
            logger.debug('current =', this.current);
            logger.debug('count   =', this.count);

            if (this.current++ >= this.count) {
                return elem;
                // as this.current += 1;
            }
            yield elem;
        }
    }

    private readonly _iter: AsyncIterable<T>;

    private readonly count: number;

    private current = 0;
}

export function _take<T>(iter: AsyncIterable<T>, n: number) {
    logger.trace('iterator/take', '_take()');
    return new Iterator<T>(new IteratorTake<T>(iter, n));
}
