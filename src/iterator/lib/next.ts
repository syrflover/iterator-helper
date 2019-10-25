export type NextReturn<T> = {
    done?: boolean;
    value: T;
};

export function next<T>(iter: AsyncIterable<T>): Promise<NextReturn<T>> {
    const it = iter[Symbol.asyncIterator]();
    return it.next();
}
