import { getLogger } from '../logger';

import { Iterator } from '../iterator';

const logger = getLogger('iterator/take');

export class IteratorTake<T> implements AsyncIterableIterator<T> {
    constructor(iter: AsyncIterable<T>, count: number) {
        logger.trace('constructor()');
        this._iter = iter;
        this.count = count;
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
        logger.debug('count   =', this.count);

        if (!done && this.current <= this.count) {
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

    private readonly count: number;

    private current = 1;
}

export function _take<T>(iter: AsyncIterable<T>, count: number) {
    logger.trace('_take()');
    return new Iterator<T>(new IteratorTake<T>(iter, count));
}
