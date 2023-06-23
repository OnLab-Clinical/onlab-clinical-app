// react
import { memo } from 'react';
// context
import { SignUpContext } from './SignUp.context';
// hooks
import { useSignUp } from './useSignUp.hook';
// components
import { SignUpForm } from './SignUpForm';
import { SignUpStep1 } from './SignUpStep1';
import { SignUpStep2 } from './SignUpStep2';

const SignUpView = memo(() => {
    const { context } = useSignUp();

    return (
        <SignUpContext.Provider value={context}>
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <SignUpForm>
                    <SignUpStep1 />

                    <SignUpStep2 />
                </SignUpForm>
            </main>
        </SignUpContext.Provider>
    );
});

export default SignUpView;
