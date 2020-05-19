import { isFunction } from './isFunction';
import { isNull } from './isNull';

export function isIterable(a: any): a is Iterable<any> {
    return isNull(a) ? false : isFunction(a[Symbol.iterator]);
}
