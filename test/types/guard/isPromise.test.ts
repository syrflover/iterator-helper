import { assert } from 'chai';

import { isPromise } from '../../../src/types/guard/isPromise';

describe('test isPromise', () => {
    it('true', () => {
        const actual = isPromise(Promise.resolve());
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('false', () => {
        const actual = isPromise(1);
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
