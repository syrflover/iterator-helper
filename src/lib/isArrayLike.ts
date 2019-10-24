import { isTypedArray } from './isTypedArray';

export function isArrayLike<T>(
    iter: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>,
): iter is T[] {
    return Array.isArray(iter) || isTypedArray(iter);
}
