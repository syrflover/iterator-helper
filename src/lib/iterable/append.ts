export async function* append<T>(xs: AsyncIterable<T>, x: T) {
    yield* xs;
    yield x;
}
