import { assert } from 'chai';

import { append } from '../../../src/lib/iterable/append';

describe('test append', () => {
    it('append(1, [0])', async () => {
        const actual: number[] = [];
        const expected = [0, 1];

        for await (const _ of append(1, [0])) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
