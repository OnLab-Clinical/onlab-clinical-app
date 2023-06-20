// react
import { useMemo } from 'react';
// props
import { SignUpContextProps } from './SignUp.props';

export const useSignUp = () => {
    // context
    const context: SignUpContextProps = useMemo(() => ({} as SignUpContextProps), []);

    return { context };
};
