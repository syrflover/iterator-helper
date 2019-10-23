import { logger } from '../logger';

import { IteratorHelper } from '../iterator';

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
    return new IteratorHelper<T>(new IteratorTake<T>(iter, n));
}
