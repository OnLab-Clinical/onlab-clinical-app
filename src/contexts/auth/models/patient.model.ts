import { SingleContactsRequest } from './contacts.model';
import { Person, personRequest } from './person.model';
import { RoleAlias } from './role.model';
import { User, UserRequest } from './user.model';

export interface Patient {
    person: Person;
    user: User;
    roles: RoleAlias[];
}

// Sign Up Patient
export interface SignUpPatientRequest {
    person: personRequest;
    nid: string;
    contacts: SingleContactsRequest;
    user: UserRequest;
}

// Sign In Patient
export interface SignInPatientRequest {
    name: string;
    password: string;
}
export interface SignInPatientResponse extends Patient {
    token: string;
    refresh: string;
}
