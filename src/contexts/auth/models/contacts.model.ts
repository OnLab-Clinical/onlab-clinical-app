import { Country, Municipality } from './location.model';

export interface Phone {
    country: Country;
    phone: string;
}
export interface PhoneRequest extends Omit<Phone, 'country'> {
    country: string;
}

export interface Address {
    municipality: Municipality;
    address: string;
    latitude: number;
    longitude: number;
}
export interface AddressRequest extends Omit<Address, 'municipality'> {
    municipality: string;
}

export interface SingleContacts {
    email: string;
    phone: Phone;
    address: Address;
}
export interface SingleContactsRequest {
    email: string;
    phone: PhoneRequest;
    address: AddressRequest;
}

export interface MultiContacts {
    emails: string[];
    phones: Phone[];
    address: Address;
}
