

import { next_async } from '../lib/iterable/next.ts';



async function _head_impl_fn<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    const { done, value } = await next_async(iter);

    
    

    if (done) {
        return;
    }

    return value;
}

export function _head<T>(iter: AsyncIterable<T>) {
    
    return _head_impl_fn(iter);
}
