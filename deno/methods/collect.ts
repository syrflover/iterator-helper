

import { foldl } from './foldl.ts';



export function collect<T>(iter: AsyncIterable<T>) {
    
    return foldl((acc: T[], e: T) => [...acc, e], [] as T[], iter);
}
