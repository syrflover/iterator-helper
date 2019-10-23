import { IteratorHelper } from '../iterator';

import { logger } from '../logger';
import { pair } from '../types/pair';

export class IteratorEnumerate<T> implements AsyncIterator<[number, T]> {
    constructor(iter: AsyncIterable<T>) {
        logger.trace('IteratorEnumerate', 'constructor()');
        this._iter = iter;
    }

    public [Symbol.asyncIterator]() {
        logger.trace('IteratorEnumerate', '[Symbol.iterator]()');
        return this;
    }

    public async next() {
        logger.trace('IteratorEnumerate', 'next()');
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
    logger.trace('iterator/enumerate', '_enumerate()');
    return new IteratorHelper<[number, T]>(new IteratorEnumerate<T>(iter));
}
