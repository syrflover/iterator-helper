import { assert } from 'chai';

import { isString } from '../../../dist/types/guard/isString';

describe('test isString', () => {
    it('string', () => {
        const actual = isString('hello');
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('array', () => {
        const actual = isString(['hello', 'world']);
        const expected = false;

        assert.strictEqual(actual, expected);
    });

    it('undefined', () => {
        const actual = isString(undefined);
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
