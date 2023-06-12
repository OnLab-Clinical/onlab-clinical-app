export type UserState = 'unverified' | 'blocked' | 'verified' | 'suspended';

export interface User {
    name: string;
    state: UserState;
}
