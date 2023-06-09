export type DomainError<ErrorMessage extends string = string, ErrorMetadata = null> = {
    message: ErrorMessage;
    metadata: ErrorMetadata;
    occurredAt: Date;
};

export function domainError<ErrorMessage extends string = string, ErrorMetadata = null>(
    message: ErrorMessage,
    metadata?: ErrorMetadata
): DomainError<ErrorMessage, ErrorMetadata> {
    return {
        message,
        metadata: metadata as ErrorMetadata,
        occurredAt: new Date(),
    };
}
