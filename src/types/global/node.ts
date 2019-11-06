import { getLogger } from '../../logger.ts';

import { iterator, ToAsyncIterator } from '../../iterator.ts';

import { EP } from '../promise.ts';

const logger = getLogger('global');

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

String.prototype.iter = function() {
    logger.info('String', 'iter()');
    return iterator(this);
};

Array.prototype.iter = function() {
    logger.info('Array', 'iter()');
    return iterator(this);
};

Int8Array.prototype.iter = function() {
    logger.info('Int8Array', 'iter()');
    return iterator(this);
};

Int16Array.prototype.iter = function() {
    logger.info('Int16Array', 'iter()');
    return iterator(this);
};

Int32Array.prototype.iter = function() {
    logger.info('Int32Array', 'iter()');
    return iterator(this);
};

Uint8Array.prototype.iter = function() {
    logger.info('Uint8Array', 'iter()');
    return iterator(this);
};

Uint8ClampedArray.prototype.iter = function() {
    logger.info('Uint8ClampedArray', 'iter()');
    return iterator(this);
};

Uint16Array.prototype.iter = function() {
    logger.info('Uint16Array', 'iter()');
    return iterator(this);
};

Uint32Array.prototype.iter = function() {
    logger.info('Uint32Array', 'iter()');
    return iterator(this);
};

Float32Array.prototype.iter = function() {
    logger.info('Float32Array', 'iter()');
    return iterator(this);
};

Float64Array.prototype.iter = function() {
    logger.info('Float64Array', 'iter()');
    return iterator(this);
};

export default global;
