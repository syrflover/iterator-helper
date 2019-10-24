// a -> [a] -> [a]
export async function* cons<T>(x: T, xs: Iterable<T> | AsyncIterable<T>) {
    yield x;
    yield* xs;
}
