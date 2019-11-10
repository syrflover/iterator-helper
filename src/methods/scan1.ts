import { getLogger } from '../logger.ts';

import { ScanFn } from '../types/function/mod.ts';

import { next_async } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';

import { scan } from './scan.ts';

const logger = getLogger('methods/scan1');

async function* _scan1_impl_fn<T>(fn: ScanFn<T, T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('scan1()');
    const { done, value: head } = await next_async(iter);

    if (done) {
        return;
    }

    yield* scan(fn, head, iter);
}

export interface Scan1 {
    <T>(fn: ScanFn<T, T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ScanFn<T, T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const scan1: Scan1 = _curry(_scan1_impl_fn);
