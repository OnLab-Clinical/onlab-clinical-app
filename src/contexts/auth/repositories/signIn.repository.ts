// types
import { DomainResponse, domainError, domainSuccess } from '@/shared/types/domain';
// constants
import { OnLabClinicalApiProvider } from '@/constants';
// utils
import { request } from '@/shared/utils';
// entities
import { Patient } from '../entities';

export interface SignInRequest {
    name: string;
    password: string;
}

export interface SignInResponse extends Patient {
    token: string;
    refresh: string;
}

export const signInRepository = async (
    req: SignInRequest
): Promise<DomainResponse<SignInResponse>> =>
    await request({
        instance: OnLabClinicalApiProvider,
        path: '/auth/v1/sign-in/patients',
        method: 'POST',
        body: req,
        serializer: async data => {
            return domainSuccess<SignInResponse>(
                {
                    ...data.data,
                    person: { ...data.data.person, birth: new Date(data.data.person.birth) },
                },
                'info'
            );
        },
        errorSerializer: async error => {
            if (!error.response) {
                return domainError(error.message);
            }

            const data = error.response.data;

            return domainError(data.message, 'warning');
        },
    });
