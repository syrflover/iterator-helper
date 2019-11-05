import '../../src/types/global';


import { assert } from 'chai';

describe('test prototype.iter()', () => {
    it('Array<number>', async () => {
        const a = [1, 2, 3, 4, 5];

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
