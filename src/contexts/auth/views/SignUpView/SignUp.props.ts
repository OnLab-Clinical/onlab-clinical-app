// react
import { UseFormReturn } from 'react-hook-form';
// types
import { Stepper } from '@/shared/hooks';
// entities
import { CountryFill, PersonSex } from '../../entities';

export interface SignUpFormData {
    // person data
    name: string;
    surname: string;
    sex: PersonSex;
    birth: Date;
    nid: string;

    // address
    addressCountry: string;
    department: string;
    municipality: string;
    address: string;
    latitude: number;
    longitude: number;

    // user data
    email: string;
    // phone number
    country: string;
    phone: string;
    username: string;
    password: string;
}

export interface SignUpContextProps {
    // values
    countries: CountryFill[];
    form: UseFormReturn<SignUpFormData>;
    stepper: Stepper;
    // actions
    handleSignUp: () => void;
}
