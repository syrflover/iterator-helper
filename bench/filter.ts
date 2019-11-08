import { BenchmarkTimer, BenchmarkDefinition } from 'https://deno.land/std/testing/bench.ts';
import { iterator } from '../mod.ts';

async function* range_async(end: number) {
    let i = 0;
    const e = end + 1;
    while (i < e) {
        yield i;
        i++;
    }
}

function* range_sync(end: number) {
    let i = 0;
    const e = end + 1;
    while (i < e) {
        yield i;
        i++;
    }
}

export function filter_bench_0(): BenchmarkDefinition {
    return {
        name: 'Iterator [0..1000].filter((e) => e % 2 === 0)',
        runs: 400,
        func: async (b: BenchmarkTimer) => {
            const iter = iterator(range_async(1000));

            b.start();

            for await (const _ of iter.filter((e) => e % 2 === 0)) {
                // do nothing
            }

            b.stop();
        },
    };
}

export function filter_bench_1(): BenchmarkDefinition {
    return {
        name: 'Iterator [0..100000].filter((e) => e % 2 === 0)',
        runs: 400,
        func: async (b: BenchmarkTimer) => {
            const iter = iterator(range_async(100000));

            b.start();

            for await (const _ of iter.filter((e) => e % 2 === 0)) {
                // do nothing
            }

            b.stop();
        },
    };
}

export function filter_bench_2(): BenchmarkDefinition {
    return {
        name: 'Array [0..1000].filter((e) => e % 2 === 0)',
        runs: 400,
        func: (b: BenchmarkTimer) => {
            const array = Array.from(range_sync(1000));

            b.start();

            for (const _ of array.filter((e) => e % 2 === 0)) {
                // do nothing
            }

            b.stop();
        },
    };
}

export function filter_bench_3(): BenchmarkDefinition {
    return {
        name: 'Array [0..100000].filter((e) => e % 2 === 0)',
        runs: 400,
        func: (b: BenchmarkTimer) => {
            const array = Array.from(range_sync(100000));

            b.start();

            for (const _ of array.filter((e) => e % 2 === 0)) {
                // do nothing
            }

            b.stop();
        },
    };
}
