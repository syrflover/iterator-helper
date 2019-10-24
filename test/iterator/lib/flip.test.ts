import { assert } from 'chai';

import { flip } from '../../../src/iterator/lib/flip';

describe('test flip', () => {
    it('div', () => {
        const actual = flip(1, 2, (a, b) => a / b);
        const expected = 2 / 1;

        assert.strictEqual(actual, expected);
    });
});
