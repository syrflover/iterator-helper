import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test Array.prototype.iter', () => {
    it('[1,2,3,4,5]', async () => {
        const a = [1, 2, 3, 4, 5];

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
