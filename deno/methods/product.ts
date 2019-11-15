import { fold } from './fold.ts';

export function product(iter: AsyncIterable<number>): Promise<number> {
    return fold((acc, e) => acc * e, 1, iter);
}
