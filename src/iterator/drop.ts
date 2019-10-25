import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

const logger = getLogger('iterator/drop');

export class IteratorDrop<T> implements AsyncIterable<T> {
    constructor(count: number, iter: AsyncIterable<T>) {
        logger.trace('constructor()');
        this._iter = iter;
        this.count = count;
    }

    public async *[Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        for await (const elem of this._iter) {
            logger.debug('count   =', this.count);
            logger.debug('current =', this.current);

            if (this.current > this.count) {
                yield elem;
            }
            this.current += 1;
        }
    }

    private readonly _iter: AsyncIterable<T>;

    private readonly count: number;

    private current: number = 1;
}

export function _drop<T>(count: number, iter: AsyncIterable<T>) {
    logger.trace('_drop()');
    return new AsyncIterator_<T>(new IteratorDrop<T>(count, iter));
}
