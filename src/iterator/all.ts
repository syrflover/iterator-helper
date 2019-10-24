import { PredicateFn } from '../types/fn/predicate';

export async function _all<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>) {
    for await (const elem of iter) {
        if (!(await fn(elem))) {
            return false;
        }
    }
    return true;
}
