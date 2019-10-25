import { getLogger } from '../logger';

import { Iterator } from '../iterator';

const logger = getLogger('iterator/take');

export class IteratorTake<T> implements AsyncIterableIterator<T> {
    constructor(limit: number, iter: AsyncIterable<T>) {
        logger.trace('constructor()');
        this._iter = iter;
        this.limit = limit;
    }

    public [Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.trace('next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value } = await it.next();

        logger.debug('done    =', done);
        logger.debug('value   =', value);
        logger.debug('current =', this.current);
        logger.debug('limit   =', this.limit);

        if (!done && this.current <= this.limit) {
            this.current += 1;
            return {
                done,
                value,
            };
        }

        return {
            done: true as any,
            value: undefined,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    private readonly limit: number;

    private current = 1;
}

export function _take<T>(limit: number, iter: AsyncIterable<T>) {
    logger.trace('_take()');
    return new Iterator<T>(new IteratorTake<T>(limit, iter));
}
