// react
import { createContext, useContext } from 'react';
// props
import { SignUpContextProps } from './SignUp.props';

export const SignUpContext = createContext<SignUpContextProps>({} as SignUpContextProps);

export const useSignUpContext = () => useContext(SignUpContext);
