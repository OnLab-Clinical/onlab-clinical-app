// react
import { memo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// utils
import { classNames } from '@/shared/utils';

const StepIndicator = memo(() => {
    const {
        stepper: [stepProps],
    } = useSignUpContext();

    return (
        <span
            className="grid gap-2 mx-auto sticky bottom-4 backdrop-blur-md px-2 py-1 rounded-sm lg:hidden"
            style={{
                gridTemplateColumns: `repeat(${stepProps.maxStep}, 1fr)`,
            }}>
            {[...Array(stepProps.maxStep)].map((_, index) => (
                <span
                    key={index}
                    className={classNames(
                        'w-3 h-3 rounded-sm border-2 border-secondary-600 transition-all',
                        index + 1 === stepProps.currentStep && 'bg-secondary-500'
                    )}
                />
            ))}
        </span>
    );
});

export default StepIndicator;
