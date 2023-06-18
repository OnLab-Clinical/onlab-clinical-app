// types
import { DomainResponse, domainError, domainSuccess } from '@/shared/types/domain';
// constants
import { OnLabClinicalApiProvider } from '@/constants';
// utils
import { request } from '@/shared/utils';

export interface SignInRequest {
    name: string;
    password: string;
}

export interface SignInResponse {
    name: string;
}

export const signInRepository = async (
    req: SignInRequest
): Promise<DomainResponse<SignInResponse>> =>
    await request<SignInResponse, SignInRequest, null>({
        instance: OnLabClinicalApiProvider,
        method: 'POST',
        path: '/auth/v1/patients/sign-in',
        body: req,
        serializer: async (data, headers, status) => {
            console.log(data, headers, status);
            return domainSuccess({
                name: '',
            });
        },
        errorSerializer: async error => {
            console.error(error.response?.data);
            return domainError(error.message);
        },
    });
