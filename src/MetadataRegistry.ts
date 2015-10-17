import {Utils} from './Utils';
import {SubscriberMetadata} from "./SubscriberMetadata";
import {EventSubscriberInterface} from "./EventSubscriberInterface";
import {OnMetadata} from "./OnMetadata";
import {EventsHandler} from "./EventsHandler";

/**
 * Registry for all controllers and actions.
 */
export class MetadataRegistry {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private _container: { get(someClass: any): any };
    private _collectEventsHandlers: SubscriberMetadata[] = [];
    private _onMetadatas: OnMetadata[] = [];

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Sets a container that can be used in subscribers. This allows you to inject container services into
     * subscribers.
     */
    set container(container: { get(someClass: any): any }) {
        this._container = container;
    }

    /**
     * Gets all events handlers that registered here via annotations.
     */
    get collectEventsHandlers(): EventsHandler[] {
        return this._collectEventsHandlers
            .filter(subscriber => subscriber.hasOwnProperty('subscribedTo'))
            .map(subscriber => {
                let cls: any = subscriber.object;
                let instance: EventSubscriberInterface = this._container ? this._container.get(subscriber.object) : new cls();
                return instance.subscribedTo();
            }).concat(this._onMetadatas.reduce((handlers: any[], metadata: OnMetadata) => {
                return handlers.concat(metadata.eventNames.map(eventName => {
                    return { [eventName]: (<any> metadata.object)[metadata.methodName] };
                }));
            }, []));
    }

    // -------------------------------------------------------------------------
    // Adder Methods
    // -------------------------------------------------------------------------

    addSubscriberMetadata(metadata: SubscriberMetadata) {
        this._collectEventsHandlers.push(metadata);
    }

    addOnMetadata(metadata: OnMetadata) {
        this._onMetadatas.push(metadata);
    }

}

/**
 * Default action registry is used as singleton and can be used to storage all metadatas.
 */
export let defaultMetadataStorage = new MetadataRegistry();