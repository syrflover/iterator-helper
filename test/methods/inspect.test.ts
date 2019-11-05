import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test inspect', () => {
    it('[1, 2, 3, 4]', async () => {
        const a = iterator([1, 4, 2, 3]);

        const actual: number[] = [];
        const expected = [1, 4, 2, 3];

        const i = a.inspect((e) => {
            actual.push(e);
        });

        for await (const _ of i) {
            (() => {})();
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('[1,4,2,3].filter(isEven)', async () => {
        const a = iterator([1, 4, 2, 3]);

        const actual: number[] = [];
        const expected = [4, 2];

        const i = a
            .filter((e) => e % 2 === 0)
            .inspect((e) => {
                actual.push(e);
            });

        for await (const _ of i) {
            (() => {})();
        }

        assert.deepStrictEqual(actual, expected);
    });
});
