import {EventsHandler} from "./EventsHandler";
import {EventSubscriberInterface} from "./EventSubscriberInterface";
import {defaultMetadataStorage} from "./MetadataRegistry";

export class EventDispatcher {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private handlers: EventsHandler[] = [];

    // -------------------------------------------------------------------------
    // Adders
    // -------------------------------------------------------------------------

    addHandler(handler: EventsHandler) {
        this.handlers.push(handler);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    on(eventName: string, callback: (data: any) => void): void;
    on(eventNames: string[], callback: (data: any) => void): void;
    on(eventNameOrNames: string|string[], callback: (data: any) => void) {
        let eventNames: string[] = [];
        if (eventNameOrNames instanceof Array) {
            eventNames = <string[]> eventNameOrNames;
        } else {
            eventNames = [<string> eventNameOrNames];
        }

        eventNames.forEach(eventName => {
            this.handlers.push({
                [eventName]: callback
            });
        });
    }

    dispatch(eventName: string, data: any): void;
    dispatch(eventNames: string[], data: any): void;
    dispatch(eventNameOrNames: string|string[], data: any) {
        let eventNames: string[] = [];
        if (eventNameOrNames instanceof Array) {
            eventNames = <string[]> eventNameOrNames;
        } else {
            eventNames = [<string> eventNameOrNames];
        }

        eventNames.forEach(eventName => {
            this.handlers
                .filter(handler => handler.hasOwnProperty(eventName))
                .forEach(handler => handler[eventName](data));
            defaultMetadataStorage
                .collectEventsHandlers
                .filter(handler => handler.hasOwnProperty(eventName))
                .forEach(handler => handler[eventName](data));
        });
    }

}
