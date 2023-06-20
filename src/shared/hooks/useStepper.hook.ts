import { useCallback, useState } from 'react';

interface StepperProps {
    minStep?: number;
    maxStep: number;
    defaultStep?: number;
}

export type Stepper = [
    stepProps: StepperProps & { currentStep: number },
    stepActions: { prevStep: () => void; nextStep: () => void; setStep: (step: number) => void }
];

export const useStepper = ({ minStep = 1, maxStep, defaultStep = 1 }: StepperProps): Stepper => {
    // validations
    if (minStep < 1) throw Error('"minStep" must be greater or equal than "1"');

    if (maxStep < minStep) throw Error('"maxStep" must be greater or equal than "minStep"');

    if (defaultStep > maxStep || defaultStep < minStep)
        throw Error('"defaultStep" must be between "minStep" & "maxStep"');

    // states
    const [currentStep, setCurrentStep] = useState<number>(defaultStep);

    const prevStep = useCallback(
        () =>
            setCurrentStep(currentValue =>
                currentValue > minStep ? currentValue - 1 : currentValue
            ),
        [minStep]
    );

    const nextStep = useCallback(
        () =>
            setCurrentStep(currentValue =>
                currentValue < maxStep ? currentValue + 1 : currentValue
            ),
        [maxStep]
    );

    const setStep = useCallback(
        (step: number) =>
            setCurrentStep(currentValue =>
                step < minStep || step > maxStep ? currentValue : step
            ),
        [maxStep, minStep]
    );

    return [
        { minStep, maxStep, defaultStep, currentStep },
        { prevStep, nextStep, setStep },
    ];
};
