import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test take', () => {
    it('take(4)', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8];

        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        const it = new Iterator(a).take(4);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('take(Infinity)', async () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8];

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];

        const it = new Iterator(a).take(Infinity);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
