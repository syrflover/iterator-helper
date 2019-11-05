import { getLogger } from '../logger';

import { next_async } from '../lib/iterable/next';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/stepBy');

async function* _step_by_impl_fn<T>(iter: AsyncIterable<T>, step: number, current_step: number = 0): AsyncIterable<T> {
    logger.trace('_step_by_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('step         =', step);
    logger.debug('current_step =', current_step);
    logger.debug('done         =', done);
    logger.debug('value        =', value);

    if (done) {
        return;
    }

    if (current_step % step === 0 || current_step === 0) {
        yield value;
    }

    yield* _step_by_impl_fn(iter, step, current_step + 1);
}

export interface StepBy {
    <T>(step: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(step: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _stepBy: StepBy = curry(<T>(step: number, iter: AsyncIterable<T>) => {
    logger.trace('_stepBy()');
    return _step_by_impl_fn(iter, step);
});
