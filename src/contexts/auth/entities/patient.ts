import { SingleContacts } from './contacts';
import { Person } from './person';
import { Role } from './role';
import { User } from './user';

export interface Patient {
    id: string;
    person: Person;
    contacts: SingleContacts;
    user: User;
    roles: Role[];
}
