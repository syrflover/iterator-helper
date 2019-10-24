import { getLogger } from '../logger';

import { iterator, ToIterator } from '../iterator';

import { EP } from './promise';

const logger = getLogger('global');

declare global {
    interface Array<T> {
        iter(): ToIterator<EP<T>>;
    }

    interface Int8Array {
        iter(): ToIterator<number>;
    }

    interface Int16Array {
        iter(): ToIterator<number>;
    }

    interface Int32Array {
        iter(): ToIterator<number>;
    }

    interface Uint8Array {
        iter(): ToIterator<number>;
    }

    interface Uint8ClampedArray {
        iter(): ToIterator<number>;
    }

    interface Uint16Array {
        iter(): ToIterator<number>;
    }

    interface Uint32Array {
        iter(): ToIterator<number>;
    }

    interface Float32Array {
        iter(): ToIterator<number>;
    }

    interface Float64Array {
        iter(): ToIterator<number>;
    }
}

Array.prototype.iter = function() {
    logger.trace('Array', 'iter()');
    return iterator(this);
};

Int8Array.prototype.iter = function() {
    logger.trace('Int8Array', 'iter()');
    return iterator(this);
};

Int16Array.prototype.iter = function() {
    logger.trace('Int16Array', 'iter()');
    return iterator(this);
};

Int32Array.prototype.iter = function() {
    logger.trace('Int32Array', 'iter()');
    return iterator(this);
};

Uint8Array.prototype.iter = function() {
    logger.trace('Uint8Array', 'iter()');
    return iterator(this);
};

Uint8ClampedArray.prototype.iter = function() {
    logger.trace('Uint8ClampedArray', 'iter()');
    return iterator(this);
};

Uint16Array.prototype.iter = function() {
    logger.trace('Uint16Array', 'iter()');
    return iterator(this);
};

Uint32Array.prototype.iter = function() {
    logger.trace('Uint32Array', 'iter()');
    return iterator(this);
};

Float32Array.prototype.iter = function() {
    logger.trace('Float32Array', 'iter()');
    return iterator(this);
};

Float64Array.prototype.iter = function() {
    logger.trace('Float64Array', 'iter()');
    return iterator(this);
};

export = global;
