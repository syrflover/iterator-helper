import { isFunction } from './isFunction.ts';
import { isNull } from './isNull.ts';

export function isIterable(a: any): a is Iterable<any> {
    return isNull(a) ? false : isFunction(a[Symbol.iterator]);
}
