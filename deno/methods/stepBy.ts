

import { _curry } from '../lib/curry.ts';



async function* _step_by_impl_fn<T>(iter: AsyncIterable<T>, step: number): AsyncIterable<T> {
    let current_step = 0;

    for await (const elem of iter) {
        if (current_step % step === 0 || current_step === 0) {
            yield elem;
        }

        current_step += 1;
    }
}

export interface StepBy {
    <T>(step: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(step: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _stepBy: StepBy = _curry(<T>(step: number, iter: AsyncIterable<T>) => {
    
    return _step_by_impl_fn(iter, step);
});
