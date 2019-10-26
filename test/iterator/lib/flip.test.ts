import { assert } from 'chai';

import { flip } from '../../../src/lib/flip';

describe('test flip', () => {
    it('div', () => {
        const actual = flip((a, b) => a / b, 1, 2);
        const expected = 2 / 1;

        assert.strictEqual(actual, expected);
    });
});
