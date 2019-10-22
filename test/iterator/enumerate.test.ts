import { assert } from 'chai';

import { IteratorHelper } from '../../src';
import { pair } from '../../src/types/pair';

describe('test enumerate', () => {
    it(`enumerate(['a', 'b', 'c', 'd', 'e'])`, () => {
        const a = new IteratorHelper(['a', 'b', 'c', 'd', 'e']);

        const actual = a.enumerate();
        const expected = new IteratorHelper([
            pair(0, 'a'),
            pair(1, 'b'),
            pair(2, 'c'),
            pair(3, 'd'),
            pair(4, 'e'),
        ]);

        assert.deepStrictEqual(actual, expected);
    });
});
