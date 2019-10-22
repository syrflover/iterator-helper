import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test find', () => {
    it('find(3) === 3', () => {
        const a = new IteratorHelper([1, 2, 3, 4, 5]);

        const actual = a.find((e) => e === 3);
        const expected = 3;

        assert.strictEqual(actual, expected);
    });

    it('find(6) === undefined', () => {
        const a = new IteratorHelper([1, 2, 3, 4, 5]);

        const actual = a.find((e) => e === 6);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
