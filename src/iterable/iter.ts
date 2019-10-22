import { IterableHelper } from '../iterable';

export function _iter<T>(it: Iterable<T>) {
    return new IterableHelper(it);
}
