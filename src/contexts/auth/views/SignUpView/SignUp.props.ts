// react
import { UseFormReturn } from 'react-hook-form';
// types
import { PersonSex } from '../../entities';

export interface SignUpFormData {
    // person data
    name: string;
    surname: string;
    birth: Date;
    sex: PersonSex;
    nid: string;

    // contacts data
    email: string;
    // phone number
    country: string;
    phone: string;
    // address
    municipality: string;
    address: string;
    latitude: number;
    longitude: number;

    // user data
    username: string;
    password: string;
}

export interface SignUpContextProps {
    // values
    form: UseFormReturn<SignUpFormData>;
    // actions
    handleSignUp: () => void;
}
