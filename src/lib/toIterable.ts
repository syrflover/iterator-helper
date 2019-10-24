export function* toIterable<T>(iter: T[]) {
    yield* iter;
}
