export type Pair<T, U> = [T, U];

export function pair<T, U>(first: T, second: U): Pair<T, U> {
    return [first, second];
}
