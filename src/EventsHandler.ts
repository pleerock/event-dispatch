export interface EventsHandler {
    [eventName: string]: (data:any) => void;
}