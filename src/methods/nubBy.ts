import { getLogger } from '../logger.ts';

import { EqualFn } from '../types/functions/mod.ts';

import { sequence } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';

import { any } from './any.ts';

const logger = await getLogger('methods/nubBy');

async function* _nub_by_impl_fn<T>(fn: EqualFn<T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('nubBy()');
    const prev: T[] = [];

    for await (const elem of iter) {
        if (!(await any((prev_elem) => fn(prev_elem, elem), sequence(prev)))) {
            yield elem;
            prev.push(elem);
        }
    }
}

export interface NubBy {
    <T>(fn: EqualFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: EqualFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const nubBy: NubBy = _curry(_nub_by_impl_fn);
