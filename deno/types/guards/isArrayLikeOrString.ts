import { isArrayLike } from './isArrayLike.ts';
import { isString } from './isString.ts';

export function isArrayLikeOrString(a: any): a is string | any[] {
    return isArrayLike(a) || isString(a);
}
