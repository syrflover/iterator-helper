import { getLogger } from '../logger';

import { iterator, Iterator, IteratorHelper } from '../iterator';

import { EP } from './promise';

const logger = getLogger('global');

declare global {
    interface Array<T> {
        iter(): IteratorHelper<Iterator<EP<T>>>;
    }
}

Array.prototype.iter = function() {
    logger.trace('array', 'iter()');
    return iterator(this);
};

export = global;
