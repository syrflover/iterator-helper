

import { next_async } from '../lib/iterable/mod.ts';



async function _head_impl_fn<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    
    const { done, value } = await next_async(iter);

    
    

    if (done) {
        return;
    }

    return value;
}

export function head<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    return _head_impl_fn(iter);
}
