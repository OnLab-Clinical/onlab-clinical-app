import { useCallback, useState } from 'react';

interface StepperProps {
    min?: number;
    max?: number;
    defaultStep?: number;
}

type Stepper = [
    step: number,
    prevStep: () => void,
    nextStep: () => void,
    setStep: (step: number) => void
];

export const useStepper = ({ min = 0, max, defaultStep = 0 }: StepperProps): Stepper => {
    // validations
    if (min < 0) throw Error('"min" must be greater or equal than "0"');
    if (max != undefined) {
        if (max < min) throw Error('"min" must be "undefined", greater or equal than "min"');
        if (defaultStep > max || defaultStep < min)
            throw Error('"defaultStep" must be between "min" & "max"');
    } else if (defaultStep < min) throw Error('"defaultStep" must be greater or equal than "min"');

    // states
    const [currentStep, setCurrentStep] = useState<number>(defaultStep);

    const prevStep = useCallback(
        () =>
            setCurrentStep(currentValue => (currentValue > min ? currentValue - 1 : currentValue)),
        [min]
    );

    const nextStep = useCallback(
        () =>
            setCurrentStep(currentValue =>
                max === undefined || currentValue < max ? currentValue + 1 : currentValue
            ),
        [max]
    );

    const setStep = useCallback(
        (step: number) =>
            setCurrentStep(currentValue =>
                (max === undefined || step <= max) && step >= min ? step : currentValue
            ),
        [max, min]
    );

    return [currentStep, prevStep, nextStep, setStep];
};
