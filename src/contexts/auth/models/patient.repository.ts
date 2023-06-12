import { DomainError, DomainResponse } from '@/shared/types/domain';
import { SignInPatientRequest, SignInPatientResponse, SignUpPatientRequest } from './patient.model';

export type SignUpPatientCommand = (request: SignUpPatientRequest) => Promise<DomainError | null>;

export type SignInPatientQuery = (
    request: SignInPatientRequest
) => Promise<DomainResponse<SignInPatientResponse, DomainError>>;
