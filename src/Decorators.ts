import {defaultMetadataRegistry} from "./MetadataRegistry";

export function EventSubscriber() {
    return function (object: Function) {
        defaultMetadataRegistry.addSubscriberMetadata({
            object: object
        });
    }
}

export function On(eventName: string): Function;
export function On(eventNames: string[]): Function;
export function On(eventNameOrNames: string|string[]): Function {
    return function (object: Object, methodName: string) {
        let eventNames: string[] = [];
        if (eventNameOrNames instanceof Array) {
            eventNames = <string[]> eventNameOrNames;
        } else {
            eventNames = [<string> eventNameOrNames];
        }

        defaultMetadataRegistry.addOnMetadata({
            object: object,
            methodName: methodName,
            eventNames: eventNames
        });
    }
}
