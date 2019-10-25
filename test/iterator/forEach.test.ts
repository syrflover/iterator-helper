import { assert } from 'chai';

import { iterator } from '../../src';

describe('test forEach', () => {
    it('[1,2,3,4,5,6]', async () => {
        const a = [1, 2, 3, 4, 5, 6];

        let actual = 0;
        const expected = a.length;

        await iterator(a).forEach((_) => {
            actual += 1;
        });

        assert.strictEqual(actual, expected);
    });
});
