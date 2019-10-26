import { isIterable } from '../../types/guard/isIterable';

export type NextReturn<T> = {
    done?: boolean;
    value: T;
};

export function next_async<T>(iter: AsyncIterable<T>): Promise<NextReturn<T>> {
    const it = iter[Symbol.asyncIterator]();
    return it.next();
}

export function next_sync<T>(iter: Iterable<T>): NextReturn<T> {
    const it = iter[Symbol.iterator]();
    return it.next();
}

export async function next<T>(iter: Iterable<T> | AsyncIterable<T>): Promise<NextReturn<T>> {
    if (isIterable(iter)) {
        return next_sync(iter);
    }
    return next_async(iter);
}
