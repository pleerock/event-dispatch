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
            .reduce((handlers: EventsHandler[], subscriber: SubscriberMetadata) => {
                let instance: EventSubscriberInterface = this.instantiateClass(subscriber);
                if (instance.subscribedTo)
                    handlers.push(instance.subscribedTo());

                this._onMetadatas
                    .filter(metadata => metadata.object.constructor === subscriber.object)
                    .forEach(metadata => metadata.eventNames.map(eventName => {
                        handlers.push({ [eventName]: (data: any) => (<any> instance)[metadata.methodName](data) });
                    }));

                return handlers;
            }, []);
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

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private instantiateClass(subscriber: SubscriberMetadata) {
        if (!subscriber.instance) {
            const cls: any = subscriber.object;
            subscriber.instance = this._container ? this._container.get(cls) : new cls();
        }

        return subscriber.instance;
    }

}

/**
 * Default action registry is used as singleton and can be used to storage all metadatas.
 */
export let defaultMetadataRegistry = new MetadataRegistry();