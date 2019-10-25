import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';
import { Iterator } from '../iterator';

const logger = getLogger('iterator/takeWhile');

export class IteratorTakeWhile<T> implements AsyncIterableIterator<T> {
    constructor(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
        logger.trace('constructor()');
        this._iter = iter;
        this.predicate = predicate;
    }

    public [Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');
        return this;
    }

    public async next() {
        logger.trace('next()');
        const it = this._iter[Symbol.asyncIterator]();
        const { done, value } = await it.next();

        logger.debug('done             =', done);
        logger.debug('value            =', value);

        if (!done) {
            const condition = await this.predicate(value);
            logger.debug('predicate(value) =', condition);

            return {
                done: !condition,
                value,
            };
        }

        return {
            done,
            value,
        };
    }

    private readonly _iter: AsyncIterable<T>;

    private readonly predicate: PredicateFn<T>;
}

export function _takeWhile<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
    return new Iterator<T>(new IteratorTakeWhile<T>(predicate, iter));
}
