export type PersonSex = 'male' | 'female';

export const personSex: PersonSex[] = ['male', 'female'];

export interface Person {
    name: string;
    surname: string;
    nid: string;
    birth: string;
    sex: PersonSex;
}
