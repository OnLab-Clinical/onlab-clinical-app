// types
import { DomainResponse } from '../types/domain';
import { Language } from '@/contexts/core/language';
// utils
import { AxiosError, AxiosInstance, AxiosResponseHeaders } from 'axios';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestHeaders {
    [x: string]: string | number | boolean;
}

interface RequestProps<RequestBody, RequestParams, RequestResponse, RequestError> {
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
        headers: AxiosResponseHeaders,
        status?: number
    ) => Promise<DomainResponse<RequestResponse, RequestError>>;
    errorSerializer: (error: AxiosError) => Promise<DomainResponse<RequestResponse, RequestError>>;
    // configuration
    abort?: AbortController;
    timeout?: number;
}

export const request = async <
    RequestResponse,
    RequestError = null,
    RequestBody = null,
    RequestParams = null
>({
    // request to
    instance,
    method = 'GET',
    path,
    // common headers
    token,
    lang = 'en',
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
}: RequestProps<RequestBody, RequestParams, RequestResponse, RequestError>): Promise<
    DomainResponse<RequestResponse, RequestError>
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
            transformResponse: serializer,
        });

        return response.data;
    } catch (error) {
        return errorSerializer(error as AxiosError);
    }
};
