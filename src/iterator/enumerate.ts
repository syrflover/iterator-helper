import { IteratorHelper } from '../iterator';

import { logger } from '../logger';
import { pair } from '../types/pair';

export class IteratorEnumerate<T> implements Iterator<[number, T]> {
    constructor(iter: Iterable<T>) {
        this._iter = iter;
    }

    public [Symbol.iterator]() {
        return this;
    }

    public next() {
        const { done, value: v } = this._iter[Symbol.iterator]().next();

        const value = pair(this.count++, v);

        return {
            done,
            value,
        };
    }

    public count: number = 0;

    public _iter: Iterable<T>;
}

export function _enumerate<T>(iter: Iterable<T>) {
    logger.trace('iterator/enumerate', '_enumerate()');
    return new IteratorHelper(new IteratorEnumerate(iter));
}
