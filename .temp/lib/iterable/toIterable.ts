export function* toIterable<T>(iter: Iterable<T>): Iterable<T> {
    yield* iter;
}
