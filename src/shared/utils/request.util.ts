// types
import { DomainResponse } from '../types/domain';
// utils
import { AxiosError, AxiosInstance, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
// services
import { Language, getCurrentLanguageService } from '@/contexts/core/language';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestHeaders {
    [x: string]: string | number | boolean;
}

interface RequestProps<RequestBody, RequestParams, RequestResponse> {
    // request to
    instance: AxiosInstance;
    method?: RequestMethod;
    path: string;
    // common headers
    token?: string;
    lang?: Language;
    // transport data
    headers?: RequestHeaders;
    params?: RequestParams;
    body?: RequestBody;
    // response
    serializer: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any,
        headers: RawAxiosResponseHeaders | AxiosResponseHeaders,
        status?: number
    ) => Promise<DomainResponse<RequestResponse>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorSerializer: (error: AxiosError<any>) => Promise<DomainResponse<RequestResponse>>;
    // configuration
    abort?: AbortController;
    timeout?: number;
}

export const request = async <RequestResponse, RequestBody = null, RequestParams = null>({
    // request to
    instance,
    method = 'GET',
    path,
    // common headers
    token,
    lang = getCurrentLanguageService(),
    // transport data
    headers,
    params,
    body,
    // response
    serializer,
    errorSerializer,
    // configuration
    abort,
    timeout = 5 * 1000,
}: RequestProps<RequestBody, RequestParams, RequestResponse>): Promise<
    DomainResponse<RequestResponse>
> => {
    try {
        const requestHeaders = {
            // base headers
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            // authorization
            ...(token != null && { Authorization: `Bearer ${token}` }),
            // othes
            ...headers,
        };

        const response = await instance.request({
            headers: requestHeaders,
            method,
            url: path,
            params,
            data: body,
            signal: abort?.signal,
            timeout,
        });
        return serializer(response.data, response.headers, response.status);
    } catch (error) {
        return errorSerializer(error as AxiosError);
    }
};
