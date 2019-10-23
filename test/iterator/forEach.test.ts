import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test forEach', () => {
    it('[1,2,3,4,5,6]', async () => {
        const a = [1, 2, 3, 4, 5, 6];

        let actual = 0;
        const expected = a.length;

        const it = new IteratorHelper(a).forEach((_) => {
            actual += 1;
        });

        for await (const _ of it) {
            (() => 0)();
        }

        assert.deepStrictEqual(actual, expected);
    });
});
