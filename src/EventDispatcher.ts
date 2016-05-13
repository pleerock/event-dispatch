import {defaultMetadataRegistry} from "./MetadataRegistry";

export class EventDispatcher {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private handlers: { [eventName: string]: { attachedTo: any, callback: ((data: any) => void) }[] } = {};

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    remove(eventName: string): void;
    remove(eventNames: string[]): void;
    remove(callback: (data: any) => void): void;
    remove(eventNameOrNamesOrCallback: string|string[]|((data: any) => void)): void {
        if (eventNameOrNamesOrCallback instanceof Array) {
            eventNameOrNamesOrCallback.forEach(eventName => this.remove(eventName));

        } else if (eventNameOrNamesOrCallback instanceof Function) {
            Object.keys(this.handlers).forEach(key => {
                this.handlers[key]
                    .filter(handler => handler.callback === eventNameOrNamesOrCallback)
                    .forEach(handler => this.handlers[key].splice(this.handlers[key].indexOf(handler), 1));
            });

        } else if (typeof eventNameOrNamesOrCallback === "string") {
            this.handlers[eventNameOrNamesOrCallback] = [];
        }
    }
    
    detach(detachFrom: any, eventName?: string): void;
    detach(detachFrom: any, eventNames?: string[]): void;
    detach(detachFrom: any, callback?: (data: any) => void): void;
    detach(detachFrom: any, eventNameOrNamesOrCallback?: string|string[]|((data: any) => void)): void {
        if (eventNameOrNamesOrCallback instanceof Array) {
            eventNameOrNamesOrCallback.forEach(eventName => this.remove(eventName));

        } else if (eventNameOrNamesOrCallback instanceof Function) {
            Object.keys(this.handlers).forEach(key => {
                this.handlers[key]
                    .filter(handler => handler.callback === eventNameOrNamesOrCallback)
                    .forEach(handler => this.handlers[key].splice(this.handlers[key].indexOf(handler), 1));
            });

        } else if (typeof eventNameOrNamesOrCallback === "string") {
            const key = eventNameOrNamesOrCallback;
            this.handlers[key]
                .filter(handler => handler.attachedTo === detachFrom)
                .forEach(handler => this.handlers[key].splice(this.handlers[key].indexOf(handler), 1))
        } else {
            Object.keys(this.handlers).forEach(key => {
                this.handlers[key]
                    .filter(handler => handler.attachedTo === detachFrom)
                    .forEach(handler => this.handlers[key].splice(this.handlers[key].indexOf(handler), 1));
            });
        }
    }

    attach(attachTo: any, eventName: string, callback: (data: any) => void): void;
    attach(attachTo: any, eventNames: string[], callback: (data: any) => void): void;
    attach(attachTo: any, eventNameOrNames: string|string[], callback: (data: any) => void) {
        let eventNames: string[] = [];
        if (eventNameOrNames instanceof Array) {
            eventNames = <string[]> eventNameOrNames;
        } else {
            eventNames = [<string> eventNameOrNames];
        }

        eventNames.forEach(eventName => {
            if (!this.handlers[eventName])
                this.handlers[eventName] = [];

            this.handlers[eventName].push({ attachedTo: attachTo, callback: callback });
        });
    }

    on(eventName: string, callback: (data: any) => void): void;
    on(eventNames: string[], callback: (data: any) => void): void;
    on(eventNameOrNames: string|string[], callback: (data: any) => void) {
        this.attach(undefined, <any> eventNameOrNames, callback);
    }

    dispatch(eventName: string, data?: any): void;
    dispatch(eventNames: string[], data?: any): void;
    dispatch(eventNameOrNames: string|string[], data?: any) {
        let eventNames: string[] = [];
        if (eventNameOrNames instanceof Array) {
            eventNames = <string[]> eventNameOrNames;
        } else if (typeof eventNameOrNames === "string") {
            eventNames = [eventNameOrNames];
        }

        eventNames.forEach(eventName => {
            if (this.handlers[eventName])
                this.handlers[eventName].forEach(handler => handler.callback(data));
            
            defaultMetadataRegistry
                .collectEventsHandlers
                .filter(handler => handler.hasOwnProperty(eventName))
                .forEach(handler => handler[eventName](data));
        });
    }

}
