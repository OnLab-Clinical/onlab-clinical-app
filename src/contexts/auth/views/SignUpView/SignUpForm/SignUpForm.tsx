// react
import { memo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// types
import { Slot } from '@/shared/types';
// utils
import { content } from '@/shared/utils';
// layouts
import { PanelLayout } from '@/shared/layouts';
// components
import StepIndicator from './StepIndicator';

const SignUpForm = memo(({ children }: { children?: Slot }) => {
    const {
        stepper: [step],
        handleSignUp,
    } = useSignUpContext();

    return (
        <form className="w-full max-w-xs lg:max-w-6xl" onSubmit={handleSignUp}>
            <PanelLayout>
                <div
                    className="flex flex-col lg:grid"
                    style={{
                        gridTemplateColumns: `repeat(${step.maxStep}, 1fr)`,
                    }}>
                    {content(children, undefined)}
                </div>

                <StepIndicator />
            </PanelLayout>
        </form>
    );
});

export default SignUpForm;
