import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

import { pair } from '../types/pair';

const logger = getLogger('iterator/enumerate');

export class IteratorEnumerate<T> implements AsyncIterator<[number, T]> {
    constructor(iter: AsyncIterable<T>) {
        logger.trace('constructor()');
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

        const value = pair<number, T>(this.count++, v);

        return {
            done,
            value,
        };
    }

    public count: number = 0;

    private readonly _iter: AsyncIterable<T>;
}

export function _enumerate<T>(iter: AsyncIterable<T>) {
    logger.trace('_enumerate()');
    return new AsyncIterator_<[number, T]>(new IteratorEnumerate<T>(iter));
}
