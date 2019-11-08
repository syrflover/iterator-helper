export async function* append<T>(x: T, xs: Iterable<T> | AsyncIterable<T>): AsyncIterable<T> {
    yield* xs;
    yield x;
}
