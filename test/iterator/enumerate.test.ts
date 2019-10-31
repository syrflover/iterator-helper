import { assert } from 'chai';

import { iterator } from '../../dist';
import { pair, Pair } from '../../dist/types/pair';

describe('test enumerate', () => {
    it(`enumerate(['a', 'b', 'c', 'd', 'e'])`, async () => {
        const a = iterator(['a', 'b', 'c', 'd', 'e']);

        const actual: Pair<number, string>[] = [];
        const expected = [pair(0, 'a'), pair(1, 'b'), pair(2, 'c'), pair(3, 'd'), pair(4, 'e')];

        for await (const _ of a.enumerate()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
