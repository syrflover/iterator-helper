import { isFunction } from './isFunction';
import { isNull } from './isNull';

export function isAsyncIterable(a: any): a is AsyncIterable<any> {
    return isNull(a) ? false : isFunction(a[Symbol.asyncIterator]);
}
