
import { assert } from 'chai';

import { isNull } from '../../../src/types/guard/isNull';

describe('test isNull', () => {
    it('null', () => {
        const actual = isNull(null);
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('undefined', () => {
        const actual = isNull(undefined);
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('NaN', () => {
        const actual = isNull(NaN);
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('string', () => {
        const actual = isNull('');
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('number', () => {
        const actual = isNull(0);
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('array', () => {
        const actual = isNull(['hello', 'world']);
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('object', () => {
        const actual = isNull({ a: 1 });
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
