// a -> [a] -> [a]
export async function* prepend<T>(x: T, xs: Iterable<T> | AsyncIterable<T>) {
    yield x;
    yield* xs;
}
