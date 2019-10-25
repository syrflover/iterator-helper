import { assert } from 'chai';

import { isArrayLike } from '../../../src/types/guard/isArrayLike';

describe('test isArrayLike', () => {
    it('array', () => {
        const actual = isArrayLike([1, 2, 3]);
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('typed array', () => {
        const actual = isArrayLike(new Int8Array(0));
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('false', () => {
        const actual = isArrayLike(1);
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
