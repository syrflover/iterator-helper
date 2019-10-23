import { logger } from '../logger';
import { IteratorHelper } from '../iterator';

import { PredicateFn } from '../types/predicate';

export class IteratorFilter<T> implements AsyncIterable<T> {
    constructor(iter: AsyncIterable<T>, predicate: PredicateFn<T>) {
        logger.trace('IteratorFilter', 'constructor()');

        this.predicate = predicate;
        this._iter = iter;
    }

    public async *[Symbol.asyncIterator]() {
        logger.trace('IteratorFilter', '[Symbol.iterator]()');

        for await (const elem of this._iter) {
            const condition = await this.predicate(elem);

            logger.debug('elem            =', elem);
            logger.debug('predicate(elem) =', condition);

            if (condition) {
                yield elem;
            }
        }
    }

    private readonly _iter: AsyncIterable<T>;

    private predicate: PredicateFn<T>;
}

export function _filter<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>) {
    logger.trace('iterator/filter', '_filter()');
    return new IteratorHelper<T>(new IteratorFilter<T>(iter, predicate));
}
