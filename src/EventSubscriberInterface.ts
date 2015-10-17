import {EventsHandler} from "./EventsHandler";

export interface EventSubscriberInterface {
    subscribedTo(): EventsHandler;
}