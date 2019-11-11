import { isFunction } from './isFunction.ts';
import { isNull } from './isNull.ts';

export function isAsyncIterable(a: any): a is AsyncIterable<any> {
    return isNull(a) ? false : isFunction(a[Symbol.asyncIterator]);
}
