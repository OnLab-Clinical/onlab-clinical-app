// types
import { DomainResponse, domainError, domainSuccess } from '@/shared/types/domain';
// constants
import { OnLabClinicalApiProvider } from '@/constants';
// utils
import { request } from '@/shared/utils';

export interface RecoveryRequest {
    email: string;
}

export const recoveryRepository = async (req: RecoveryRequest): Promise<DomainResponse> =>
    await request({
        instance: OnLabClinicalApiProvider,
        path: '/auth/v1/recovery/patients',
        method: 'POST',
        body: req,
        serializer: async () => {
            return domainSuccess(undefined, 'info');
        },
        errorSerializer: async error => {
            if (!error.response) {
                return domainError(error.message);
            }

            const data = error.response.data;

            return domainError(data.message, 'warning');
        },
    });
