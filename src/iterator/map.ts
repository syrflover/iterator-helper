import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

import { MapFn } from '../types/fn/map';

const logger = getLogger('iterator/map');

export class AsyncIteratorMap<T, R> implements AsyncIterableIterator<T> {
    constructor(fn: MapFn<T, R>, iter: AsyncIterable<T>) {
        logger.trace('constructor()');
        this.fn = fn;
        this._iter = iter;
    }

    public [Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.trace('next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value: v } = await it.next();

        const value = !done ? await this.fn(v) : v;

        logger.debug('done      =', done);
        logger.debug('value     =', v);
        logger.debug('fn(value) =', value);

        return {
            done,
            value,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    private fn: MapFn<T, R>;
}

export function _map<T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>) {
    logger.trace('_map()');
    return new AsyncIterator_<R>(new AsyncIteratorMap<T, R>(fn, iter));
}
