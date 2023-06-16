// react
import { createContext, useContext } from 'react';
// props
import { SignInContextProps } from './SignIn.props';

export const SignInContext = createContext<SignInContextProps>({} as SignInContextProps);

export const useSignInContext = () => useContext(SignInContext);
