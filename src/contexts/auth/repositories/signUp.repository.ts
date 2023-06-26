// types
import { DomainResponse, domainError, domainSuccess } from '@/shared/types/domain';
// constants
import { OnLabClinicalApiProvider } from '@/constants';
// utils
import { request } from '@/shared/utils';
// entities
import { Person, SingleContactsRequest, UserRequest } from '../entities';

export interface SignUpRequest {
    person: Omit<Person, 'nid'>;
    nid: string;
    contacts: SingleContactsRequest;
    user: UserRequest;
}

export const signUpRepository = async (req: SignUpRequest): Promise<DomainResponse> =>
    await request({
        instance: OnLabClinicalApiProvider,
        path: '/auth/v1/sign-up/patients',
        method: 'POST',
        body: req,
        serializer: async () => {
            return domainSuccess(undefined, 'success');
        },
        errorSerializer: async error => {
            if (!error.response) {
                return domainError(error.message);
            }

            const data = error.response.data;

            return domainError(data.message, 'warning');
        },
    });
