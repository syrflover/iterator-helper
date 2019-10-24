// (A -> B -> C) -> B -> A -> C
export function flip<A, B, C>(b: B, a: A, fn: (a: A, b: B) => C) {
    return fn(a, b);
}
