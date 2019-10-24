import { getLogger } from '../logger';

import { Iterator } from '../iterator';

const logger = getLogger('iterator/take');

export class IteratorTake<T> implements AsyncIterable<T> {
    constructor(iter: AsyncIterable<T>, count: number) {
        logger.trace('constructor()');
        this._iter = iter;
        this.count = count;
    }

    public async *[Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        for await (const elem of this._iter) {
            logger.debug('elem    =', elem);
            logger.debug('current =', this.current);
            logger.debug('count   =', this.count);

            if (this.current <= this.count) {
                yield elem;
            }

            if (this.current + 1 > this.count) {
                return;
            }
            this.current += 1;
        }
    }

    private readonly _iter: AsyncIterable<T>;

    private readonly count: number;

    private current = 1;
}

export function _take<T>(iter: AsyncIterable<T>, n: number) {
    logger.trace('_take()');
    return new Iterator<T>(new IteratorTake<T>(iter, n));
}
