import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test prototype.iter()', () => {
    it('Uint16Array', async () => {
        const a = new Uint16Array(5);
        a[0] = 0;
        a[1] = 1;
        a[2] = 2;
        a[3] = 3;
        a[4] = 4;

        const actual: number[] = [];
        const expected = [0, 1, 2, 3, 4];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
