import { isArrayLike } from './isArrayLike';
import { isString } from './isString';

export function isArrayLikeOrString(iter: any): iter is string | any[] {
    return isArrayLike(iter) || isString(iter);
}
