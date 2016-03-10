import {EventSubscriberInterface} from "./EventSubscriberInterface";

export interface SubscriberMetadata {
    object: Function;
    instance: EventSubscriberInterface;
}
