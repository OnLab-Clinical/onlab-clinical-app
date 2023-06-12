export type PersonSex = 'male' | 'female';

export interface Person {
    name: string;
    surname: string;
    nid: string;
    birth: Date;
    sex: PersonSex;
}
