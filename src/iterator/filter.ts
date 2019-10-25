import { getLogger } from '../logger';

import { Iterator } from '../iterator';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/filter');

export class IteratorFilter<T> implements AsyncIterable<T> {
    constructor(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
        logger.trace('constructor()');

        this.predicate = predicate;
        this._iter = iter;
    }

    public async *[Symbol.asyncIterator]() {
        logger.trace('[Symbol.asyncIterator]()');

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

export function _filter<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_filter()');
    return new Iterator<T>(new IteratorFilter<T>(predicate, iter));
}
