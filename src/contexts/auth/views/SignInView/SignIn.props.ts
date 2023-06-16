import { UseFormReturn } from 'react-hook-form';

export interface SignInFormData {
    name: string;
    password: string;
}

export interface SignInContextProps {
    // values
    form: UseFormReturn<SignInFormData>;
    // actions
    handleSignIn: () => void;
}
