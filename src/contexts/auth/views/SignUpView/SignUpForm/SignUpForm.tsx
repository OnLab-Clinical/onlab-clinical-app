// react
import { memo } from 'react';
// hooks
import { useSignUpForm } from './useSignUpForm.hook';

const SignUpForm = memo(() => {
    const _ = useSignUpForm();

    return <form></form>;
});

export default SignUpForm;
