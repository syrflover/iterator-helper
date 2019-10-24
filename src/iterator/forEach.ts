import { getLogger } from '../logger';

import { ForEachFn } from '../types/fn/forEach';
import { Iterator } from '../iterator';

const logger = getLogger('iterator/forEach');

export class IteratorForEach<T> implements AsyncIterableIterator<void> {
    constructor(iter: AsyncIterable<T>, fn: ForEachFn<T>) {
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

export function _forEach<T>(iter: AsyncIterable<T>, fn: ForEachFn<T>) {
    logger.trace('_forEach()');
    return new Iterator<void>(new IteratorForEach<T>(iter, fn));
}
