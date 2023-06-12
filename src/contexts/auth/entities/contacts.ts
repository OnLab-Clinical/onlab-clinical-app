import { Country, Municipality } from './location';

export interface Phone {
    country: Country;
    phone: string;
}

export interface Address {
    municipality: Municipality;
    address: string;
    latitude: number;
    longitude: number;
}

export interface SingleContacts {
    email: string;
    phone: Phone;
    address: Address;
}

export interface MultiContacts {
    emails: string[];
    phones: Phone[];
    address: Address;
}
