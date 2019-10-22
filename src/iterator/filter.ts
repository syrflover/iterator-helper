import { logger } from '../logger';
import { IteratorHelper } from '../iterator';

export class IteratorFilter<T> implements Iterable<T> {
    constructor(iter: Iterable<T>, predicate: (elem: T) => boolean) {
        logger.trace('IteratorFilter', 'constructor()');

        this.predicate = predicate;
        this._iter = iter;
    }

    public *[Symbol.iterator]() {
        logger.trace('IteratorFilter', '[Symbol.iterator]()');

        for (const elem of this._iter) {
            const condition = this.predicate(elem);

            logger.debug('elem            =', elem);
            logger.debug('predicate(elem) =', condition);

            if (condition) {
                yield elem;
            }
        }
    }

    private readonly _iter: Iterable<T>;

    private predicate: (elem: T) => boolean;
}

export function _filter<T>(iter: Iterable<T>, predicate: (elem: T) => boolean) {
    logger.trace('iterator/filter', '_filter()');
    return new IteratorHelper<T>(new IteratorFilter<T>(iter, predicate));
}
