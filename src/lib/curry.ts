export interface Curry2<P1, P2, R> {
    (p1: P1): (p2: P2) => R;
    (p1: P1, p2: P2): R;
}

export function curry(fn: (...args: any[]) => any): any {
    return (...args: any[]) => {
        if (fn.length > args.length) {
            return (...nextArgs: any[]) => curry(fn)(...args, ...nextArgs);
        }
        return fn(...args);
    };
}
