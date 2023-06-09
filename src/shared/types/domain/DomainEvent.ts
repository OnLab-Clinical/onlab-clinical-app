export type DomainEvent<EventName, EventMetadata> = {
    name: EventName;
    metadata: EventMetadata;
    occurredAt: Date;
};
