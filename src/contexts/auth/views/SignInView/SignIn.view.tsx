// react
import { memo } from 'react';
// components
import SignInForm from './SignIn.form';

const SignInView = memo(() => {
    return (
        <main className="flex-grow flex flex-col justify-center items-center p-4">
            <SignInForm />
        </main>
    );
});

export default SignInView;
