// store
import { store } from '@/contexts/core/store/store';
import { authActions } from '../reducers';
// types
import { DomainResponse, domainError } from '@/shared/types/domain';
// utils
import { AxiosError } from 'axios';
// repositories
import { refreshRepository } from '../repositories';

const getCurrentTokenService = (): string => store.getState().auth.token;
const getCurrentRefreshTokenService = (): string => store.getState().auth.refresh;

export const repeatLastRequestService = async <RequestResponse, RequestRequest>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: AxiosError<any>,
    repeat: (req: RequestRequest) => Promise<DomainResponse<RequestResponse>>,
    req: RequestRequest
): Promise<DomainResponse<RequestResponse>> => {
    if (!error.response) {
        return domainError(error.message);
    }

    if (error.response.status !== 401) {
        const data = error.response.data;

        return domainError(data.message, 'warning');
    }

    const request = await refreshRepository({
        token: getCurrentTokenService(),
        refresh: getCurrentRefreshTokenService(),
    });

    if (!request.success) {
        store.dispatch(authActions.unsetPatient());

        return domainError(request.message, request.kind);
    }

    store.dispatch(authActions.updateTokens(request.data));

    return await repeat(req);
};
