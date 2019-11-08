import { initLast } from './initLast.ts';

export async function* init<T>(iter: AsyncIterable<T>) {
    const [r] = await initLast(iter);

    yield* r;
}
