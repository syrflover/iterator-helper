import { isIterable } from '../../types/guard/isIterable';

export type NextReturn<T> = {
    done?: boolean;
    value: T;
};

export async function next<T>(iter: Iterable<T> | AsyncIterable<T>): Promise<NextReturn<T>> {
    if (isIterable(iter)) {
        const it = iter[Symbol.iterator]();
        return it.next();
    }
    const it = iter[Symbol.asyncIterator]();
    return it.next();
}
