import { bench, runIfMain } from 'https://deno.land/std/testing/bench.ts';

import { filter_bench_0, filter_bench_1, filter_bench_2, filter_bench_3 } from './filter.ts';

const benchmarks = [filter_bench_0, filter_bench_1, filter_bench_2, filter_bench_3];

for (const fn of benchmarks) {
    bench(fn());
}

runIfMain(import.meta, { skip: /throw/ });
