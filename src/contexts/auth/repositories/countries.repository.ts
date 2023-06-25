// types
import { DomainResponse, domainError, domainSuccess } from '@/shared/types/domain';
// constants
import { OnLabClinicalApiProvider } from '@/constants';
// utils
import { request } from '@/shared/utils';
// entities
import { CountryFill } from '../entities';

export const countriesRepository = async (): Promise<DomainResponse<CountryFill[]>> =>
    await request({
        instance: OnLabClinicalApiProvider,
        path: '/auth/v1/resources/countries',
        method: 'GET',
        serializer: async data => {
            return domainSuccess<CountryFill[]>(data.data, 'info');
        },
        errorSerializer: async error => {
            if (!error.response) {
                return domainError(error.message);
            }

            const data = error.response.data;

            return domainError(data.message, 'warning');
        },
    });
