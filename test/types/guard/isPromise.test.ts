import { assert } from 'chai';

import { isPromise } from '../../../dist/types/guard/isPromise';

describe('test isPromise', () => {
    it('true', () => {
        const actual = isPromise(Promise.resolve());
        const expected = true;

        assert.strictEqual(actual, expected);
    });

    it('undefined', () => {
        const actual = isPromise(undefined);
        const expected = false;

        assert.strictEqual(actual, expected);
    });
});
