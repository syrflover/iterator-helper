import { EP } from '../types/promise';

import { IteratorHelper } from '../iterator';

declare global {
    interface Array<T> {
        iter(): IteratorHelper<EP<T>>;
    }
}

Array.prototype.iter = function() {
    const self = this;
    const it = function*() {
        yield* self;
    };

    return new IteratorHelper(it());
};

export = global;
