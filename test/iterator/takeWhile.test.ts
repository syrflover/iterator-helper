import { assert } from 'chai';

import { iterator } from '../../src';

describe('test takeWhile', () => {
    it('takeWhile(x < 4)', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected = [1, 2, 3];

        const it = a.takeWhile((e) => e < 4);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('takeWhile(e => true)', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];

        const it = a.takeWhile((e) => true);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
