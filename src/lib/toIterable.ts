export function* toIterable<T>(iter: T[]) {
    yield* iter;
}

export function isIterable(iter: any): iter is Iterable<any> {
    return Symbol.iterator in iter;
}

export function isAsyncIterable(iter: any): iter is AsyncIterable<any> {
    return Symbol.asyncIterator in iter;
}

export function toAsyncIterable<T>(
    iter: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>,
): AsyncIterableIterator<T> {
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        async next() {
            const iter_ = await iter;

            if (isIterable(iter_)) {
                const it = iter_[Symbol.iterator]();
                const { done, value } = it.next();

                return { done, value };
            }

            if (isAsyncIterable(iter_)) {
                const it = iter_[Symbol.asyncIterator]();
                const { done, value } = await it.next();

                return { done, value };
            }

            return { done: true, value: undefined };
        },
    };
}
