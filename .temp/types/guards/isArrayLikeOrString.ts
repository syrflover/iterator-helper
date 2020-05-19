import { isArrayLike } from './isArrayLike';
import { isString } from './isString';

export function isArrayLikeOrString(a: any): a is string | any[] {
    return isArrayLike(a) || isString(a);
}
