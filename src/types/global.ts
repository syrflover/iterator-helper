import type { EP } from './promise.ts';

import { getLogger } from '../logger.ts';

import { iterator, ToAsyncIterator } from '../mod.ts';

const logger = await getLogger('global');

declare global {
    interface String {
        iter(): ToAsyncIterator<string>;
    }

    interface Array<T> {
        iter(): ToAsyncIterator<EP<T>>;
    }

    interface Int8Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Int16Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Int32Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Uint8Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Uint8ClampedArray {
        iter(): ToAsyncIterator<number>;
    }

    interface Uint16Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Uint32Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Float32Array {
        iter(): ToAsyncIterator<number>;
    }

    interface Float64Array {
        iter(): ToAsyncIterator<number>;
    }
}

String.prototype.iter = function () {
    logger.trace('String', 'iter()');
    return iterator(this);
};

Array.prototype.iter = function () {
    logger.trace('Array', 'iter()');
    return iterator(this);
};

Int8Array.prototype.iter = function () {
    logger.trace('Int8Array', 'iter()');
    return iterator(this);
};

Int16Array.prototype.iter = function () {
    logger.trace('Int16Array', 'iter()');
    return iterator(this);
};

Int32Array.prototype.iter = function () {
    logger.trace('Int32Array', 'iter()');
    return iterator(this);
};

Uint8Array.prototype.iter = function () {
    logger.trace('Uint8Array', 'iter()');
    return iterator(this);
};

Uint8ClampedArray.prototype.iter = function () {
    logger.trace('Uint8ClampedArray', 'iter()');
    return iterator(this);
};

Uint16Array.prototype.iter = function () {
    logger.trace('Uint16Array', 'iter()');
    return iterator(this);
};

Uint32Array.prototype.iter = function () {
    logger.trace('Uint32Array', 'iter()');
    return iterator(this);
};

Float32Array.prototype.iter = function () {
    logger.trace('Float32Array', 'iter()');
    return iterator(this);
};

Float64Array.prototype.iter = function () {
    logger.trace('Float64Array', 'iter()');
    return iterator(this);
};
