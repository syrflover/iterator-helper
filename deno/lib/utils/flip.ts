// (A -> B -> C) -> B -> A -> C
export function flip<A, B, C>(fn: (a: A, b: B) => C, b: B, a: A) {
    return fn(a, b);
}
