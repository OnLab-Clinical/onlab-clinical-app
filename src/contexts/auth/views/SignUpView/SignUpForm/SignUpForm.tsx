// react
import { memo } from 'react';
import { Link } from 'react-router-dom';
// context
import { useSignUpContext } from '../SignUp.context';
// types
import { Slot } from '@/shared/types';
// hooks
import { useLanguage } from '@/contexts/core/language';
// utils
import { content } from '@/shared/utils';
// layouts
import { PanelLayout } from '@/shared/layouts';
// components
import { Icon } from '@/shared/components';
import StepIndicator from './StepIndicator';
// assets
import { mdiArrowLeft } from '@mdi/js';

const SignUpForm = memo(({ children }: { children?: Slot }) => {
    const {
        stepper: [step],
        handleSignUp,
    } = useSignUpContext();

    const { translate } = useLanguage();

    return (
        <form className="w-full max-w-xs lg:max-w-6xl" onSubmit={handleSignUp}>
            <PanelLayout>
                <div className="flex flex-col items-center text-center font-semibold">
                    <Link
                        to="../sign-in"
                        replace
                        className="text-secondary-500 underline font-medium flex flex-row gap-2 items-center self-start mb-1 lg:mb-0">
                        <Icon path={mdiArrowLeft} className="text-xl" />

                        <span>{translate('auth.sign-up.sign-in-nav')}</span>
                    </Link>

                    <h1 className="text-2xl">{translate('app.title')}</h1>

                    <h2 className="text-lg">{translate('auth.sign-up.title')}</h2>
                </div>

                <div
                    className="flex flex-col lg:grid lg:gap-4 xl:gap-6 2xl:gap-8"
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
