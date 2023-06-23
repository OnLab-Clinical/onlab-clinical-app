// react
import { UseFormReturn } from 'react-hook-form';
// types
import { PersonSex } from '../../entities';
import { Stepper } from '@/shared/hooks';

export interface SignUpFormData {
    // person data
    name: string;
    surname: string;
    sex: PersonSex;
    birth: Date;
    nid: string;

    // contacts data
    email: string;
    // phone number
    country: string;
    phone: string;
    // address
    addressCountry: string;
    department: string;
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
    stepper: Stepper;
    // actions
    handleSignUp: () => void;
}
