
import { assert } from 'chai';

import { prepend } from '../../../src/lib/iterable/prepend';

describe('test prepend', () => {
    it('prepend(0, [1])', async () => {
        const actual: number[] = [];
        const expected = [0, 1];

        for await (const _ of prepend(0, [1])) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
