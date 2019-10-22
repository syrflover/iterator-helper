import { IteratorHelper } from '../iterator';

// TODO array [].iter() impl
declare global {
    // tslint:disable-next-line: interface-name
    interface Array<T> {
        iter(): IteratorHelper<T>;
    }
}

Array.prototype.iter = function () {
    // tslint:disable-next-line: no-this-assignment
    const self = this;
    const it = function* () {
        yield* self;
    };

    return new IteratorHelper(it());
};

export = global;
