import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

import { ForEachFn } from '../types/fn/forEach';

const logger = getLogger('iterator/forEach');

export class AsyncIteratorForEach<T> implements AsyncIterableIterator<void> {
    constructor(fn: ForEachFn<T>, iter: AsyncIterable<T>) {
        logger.trace('constructor()');
        this._iter = iter;
        this.fn = fn;
    }

    public [Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.trace('next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value } = await it.next();

        if (!done) {
            await this.fn(value);
        }

        return {
            done,
            value: undefined,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    private fn: ForEachFn<T>;
}

export function _forEach<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_forEach()');
    return new AsyncIterator_<void>(new AsyncIteratorForEach<T>(fn, iter));
}
