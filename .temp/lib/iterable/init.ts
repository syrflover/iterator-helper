import { initLast } from './initLast';

export async function* init<T>(iter: AsyncIterable<T>) {
    const [r] = await initLast(iter);

    yield* r;
}
