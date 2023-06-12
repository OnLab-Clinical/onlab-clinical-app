export type UserState = 'unverified' | 'blocked' | 'verified' | 'suspended';

export interface User {
    id: string;
    name: string;
    state: UserState;
}

export interface UserRequest {
    name: string;
    password: string;
}
