import { getLogger } from '../logger';

import { iterator, Iterator, IteratorHelper } from '../iterator';

import { EP } from '../types/promise';

const logger = getLogger('Array');

declare global {
    interface Array<T> {
        iter(): IteratorHelper<Iterator<EP<T>>>;
    }
}

Array.prototype.iter = function() {
    logger.trace('iter()');
    return iterator(this);
};

export = global;
