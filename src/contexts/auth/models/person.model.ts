export type PersonSex = 'male' | 'female';

export interface Person {
    name: string;
    surname: string;
    nid: string;
    birth: Date;
    sex: PersonSex;
}

export interface personRequest extends Omit<Person, 'birth'> {
    birth: string;
}
