import { EP } from '../types/promise';

import { iterator, Iterator, IteratorHelper } from '../iterator';

declare global {
    interface Array<T> {
        iter(): IteratorHelper<Iterator<EP<T>>>;
    }
}

Array.prototype.iter = function() {
    return iterator(this);
};

export = global;
