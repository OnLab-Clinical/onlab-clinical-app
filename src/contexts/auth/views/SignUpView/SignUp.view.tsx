// react
import { memo } from 'react';
// context
import { SignUpContext } from './SignUp.context';
// hooks
import { useSignUp } from './useSignUp.hook';
// components
import { SignUpForm } from './SignUpForm';

const SignUpView = memo(() => {
    const { context } = useSignUp();

    return (
        <SignUpContext.Provider value={context}>
            <main className="flex-grow flex flex-col p-4">
                <SignUpForm />
            </main>
        </SignUpContext.Provider>
    );
});

export default SignUpView;
