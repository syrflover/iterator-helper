import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test filterMap', () => {
    it('parseInt', async () => {
        const a = iterator(['a', 'b', '1', '2', '3', 'c', '4', 'd']);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4];

        for await (const _ of a.filterMap((e) => parseInt(e, 10))) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
