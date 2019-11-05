import { assert } from 'chai';

import { curry } from '../../dist/lib/curry';

describe('test curry', () => {
    it('add a b', () => {
        const add = (a: number, b: number) => a + b;

        const curried = curry(add);

        const add_2 = curried(2);

        assert.strictEqual(add_2(5), 7);
    });

    it('add a b c d', () => {
        const add = (a: number, b: number, c: number, d: number) => a + b + c + d;

        const curried = curry(add);

        const add_2 = curried(2);
        const add_2_3 = add_2(3);

        assert.strictEqual(add_2(3)(4)(5), 14);
        assert.strictEqual(add_2(3)(4, 5), 14);
        assert.strictEqual(add_2(3, 4)(5), 14);
        assert.strictEqual(add_2(3, 4, 5), 14);
        assert.strictEqual(add_2_3(4, 5), 14);
        assert.strictEqual(add_2_3(4)(5), 14);
    });
});
