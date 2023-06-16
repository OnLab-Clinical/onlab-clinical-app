// react
import { memo } from 'react';
// context
import { SignInContext } from './SignIn.context';
// hooks
import { useSignIn } from './useSignIn.hook';
// components
import { SignInForm } from './SignInForm';

const SignInView = memo(() => {
    const { context } = useSignIn();

    return (
        <SignInContext.Provider value={context}>
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <SignInForm />
            </main>
        </SignInContext.Provider>
    );
});

export default SignInView;
