import { NotificationKind } from '../notification.type';

type Domain<T extends boolean> = {
    success: T;
    kind: NotificationKind;
};

interface DomainSucess<T> extends Domain<true> {
    data: T;
}

export const domainSuccess = <T>(data: T, kind: NotificationKind = 'success'): DomainSucess<T> => ({
    success: true,
    kind,
    data,
});

interface DomainError extends Domain<false> {
    message: string;
}

export const domainError = (message: string, kind: NotificationKind = 'danger'): DomainError => ({
    success: false,
    kind,
    message,
});

export type DomainResponse<T> = DomainSucess<T> | DomainError;
