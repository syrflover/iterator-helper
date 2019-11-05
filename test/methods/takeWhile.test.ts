
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test takeWhile', () => {
    it('takeWhile(x < 3, [1,2,3,4,1,2,3,4]) == [1,2]', async () => {
        const a = iterator([1, 2, 3, 4, 1, 2, 3, 4]);

        const actual: number[] = [];
        const expected = [1, 2];

        const it = a.takeWhile((e) => e < 3);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('takeWhile(e < 9, [1,2,3]) == [1,2,3]', async () => {
        const a = iterator([1, 2, 3]);

        const actual: number[] = [];
        const expected = [1, 2, 3];

        const it = a.takeWhile((e) => e < 9);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('takeWhile(e < 9, [1,2,3]) == []', async () => {
        const a = iterator([1, 2, 3]);

        const actual: number[] = [];
        const expected: number[] = [];

        const it = a.takeWhile((e) => e < 0);

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
