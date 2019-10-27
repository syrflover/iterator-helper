import { next_async } from './next';
import { prepend } from './prepend';

async function* _init<T>(a: T, iter: AsyncIterable<T>): AsyncIterable<T> {
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    yield* prepend(a, _init(value, iter));
}

export async function* init<T>(iter: AsyncIterable<T>) {
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    yield* _init(value, iter);
}
