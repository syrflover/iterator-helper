export function curry<P1, P2, R>(f: (p1: P1, p2: P2) => R): Curry2<P1, P2, R>;
export function curry<P1, P2, P3, R>(f: (p1: P1, p2: P2, p3: P3) => R): Curry3<P1, P2, P3, R>;
export function curry<P1, P2, P3, P4, R>(f: (p1: P1, p2: P2, p3: P3, p4: P4) => R): Curry4<P1, P2, P3, P4, R>;
export function curry<P1, P2, P3, P4, P5, R>(f: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R): Curry5<P1, P2, P3, P4, P5, R>;
export function curry<P1, P2, P3, P4, P5, P6, R>(
    f: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R,
): Curry6<P1, P2, P3, P4, P5, P6, R>;
export function curry<P1, P2, P3, P4, P5, P6, P7, R>(
    f: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R,
): Curry7<P1, P2, P3, P4, P5, P6, P7, R>;
export function curry<P1, P2, P3, P4, P5, P6, P7, P8, R>(
    f: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R,
): Curry8<P1, P2, P3, P4, P5, P6, P7, P8, R>;
export function curry<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(
    f: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R,
): Curry9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>;
export function curry<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>(
    f: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10) => R,
): Curry10<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>;

export function curry(fn: (...args: any[]) => any) {
    return (...args: any[]) => {
        if (fn.length > args.length) {
            return (...nextArgs: any[]) => (curry(fn) as any)(...args, ...nextArgs);
        }
        return fn(...args);
    };
}

export function _curry(fn: (...args: any[]) => any) {
    return (...args: any[]) => {
        if (fn.length > args.length) {
            return (...nextArgs: any[]) => (curry(fn) as any)(...args, ...nextArgs);
        }
        return fn(...args);
    };
}

export interface Curry2<P1, P2, R> {
    (p1: P1): (p2: P2) => R;
    (p1: P1, p2: P2): R;
}

export interface Curry3<P1, P2, P3, R> {
    (p1: P1): Curry2<P2, P3, R>;
    (p1: P1, p2: P2): (p3: P3) => R;
    (p1: P1, p2: P2, p3: P3): R;
}

export interface Curry4<P1, P2, P3, P4, R> {
    (p1: P1): Curry3<P2, P3, P4, R>;
    (p1: P1, p2: P2): Curry2<P3, P4, R>;
    (p1: P1, p2: P2, p3: P3): (p4: P4) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4): R;
}

export interface Curry5<P1, P2, P3, P4, P5, R> {
    (p1: P1): Curry4<P2, P3, P4, P5, R>;
    (p1: P1, p2: P2): Curry3<P3, P4, P5, R>;
    (p1: P1, p2: P2, p3: P3): Curry2<P4, P5, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): R;
}

export interface Curry6<P1, P2, P3, P4, P5, P6, R> {
    (p1: P1): Curry5<P2, P3, P4, P5, P6, R>;
    (p1: P1, p2: P2): Curry4<P3, P4, P5, P6, R>;
    (p1: P1, p2: P2, p3: P3): Curry3<P4, P5, P6, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4): Curry2<P5, P6, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): R;
}

export interface Curry7<P1, P2, P3, P4, P5, P6, P7, R> {
    (p1: P1): Curry6<P2, P3, P4, P5, P6, P7, R>;
    (p1: P1, p2: P2): Curry5<P3, P4, P5, P6, P7, R>;
    (p1: P1, p2: P2, p3: P3): Curry4<P4, P5, P6, P7, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4): Curry3<P5, P6, P7, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): Curry2<P6, P7, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): R;
}

export interface Curry8<P1, P2, P3, P4, P5, P6, P7, P8, R> {
    (p1: P1): Curry7<P2, P3, P4, P5, P6, P7, P8, R>;
    (p1: P1, p2: P2): Curry6<P3, P4, P5, P6, P7, P8, R>;
    (p1: P1, p2: P2, p3: P3): Curry5<P4, P5, P6, P7, P8, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4): Curry4<P5, P6, P7, P8, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): Curry3<P6, P7, P8, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): Curry2<P7, P8, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): (p8: P8) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): R;
}

export interface Curry9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R> {
    (p1: P1): Curry8<P2, P3, P4, P5, P6, P7, P8, P9, R>;
    (p1: P1, p2: P2): Curry7<P3, P4, P5, P6, P7, P8, P9, R>;
    (p1: P1, p2: P2, p3: P3): Curry6<P4, P5, P6, P7, P8, P9, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4): Curry5<P5, P6, P7, P8, P9, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): Curry4<P6, P7, P8, P9, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): Curry3<P7, P8, P9, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): Curry2<P8, P9, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): (p9: P9) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9): R;
}

export interface Curry10<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R> {
    (p1: P1): Curry9<P2, P3, P4, P5, P6, P7, P8, P9, P10, R>;
    (p1: P1, p2: P2): Curry8<P3, P4, P5, P6, P7, P8, P9, P10, R>;
    (p1: P1, p2: P2, p3: P3): Curry7<P4, P5, P6, P7, P8, P9, P10, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4): Curry6<P5, P6, P7, P8, P9, P10, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): Curry5<P6, P7, P8, P9, P10, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): Curry4<P7, P8, P9, P10, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): Curry3<P8, P9, P10, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): Curry2<P9, P10, R>;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9): (p10: P10) => R;
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10): R;
}
