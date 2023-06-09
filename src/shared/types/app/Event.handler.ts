import { DomainEvent } from '../domain';

export type EventHandler<EventName, EventMetadata> = (
    event: DomainEvent<EventName, EventMetadata>
) => void;
