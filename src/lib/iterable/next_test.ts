import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { next_sync, next_async } from './mod.ts';

function* iterable(): Iterable<number> {
    yield 1;
    yield 2;
    yield 3;
}

Deno.test('prepend(0, [1])', async () => {
    const it = iterable();

    assertEquals(next_sync(it), { done: false, value: 1 });
    assertEquals(next_sync(it), { done: false, value: 2 });
    assertEquals(next_sync(it), { done: false, value: 3 });
    assertEquals(next_sync(it), { done: true, value: undefined });
});
