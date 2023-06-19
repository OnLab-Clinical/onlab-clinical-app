// types
import { DomainResponse, domainError, domainSuccess } from '@/shared/types/domain';
// constants
import { OnLabClinicalApiProvider } from '@/constants';
// utils
import { request } from '@/shared/utils';

export interface RefreshRequest {
    token: string;
    refresh: string;
}

export interface RefreshResponse {
    token: string;
    refresh: string;
}

export const refreshRepository = async (
    req: RefreshRequest
): Promise<DomainResponse<RefreshResponse>> =>
    await request({
        instance: OnLabClinicalApiProvider,
        path: '/auth/v1/resoruces/refresh',
        method: 'POST',
        body: req,
        serializer: async data => {
            return domainSuccess<RefreshResponse>(data.data, 'info');
        },
        errorSerializer: async error => {
            if (!error.response) {
                return domainError(error.message);
            }

            const data = error.response.data;

            return domainError(data.message);
        },
    });
