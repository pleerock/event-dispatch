# T-Event-Dispatcher

Allows to register subscribers and dispatch events across the application.

## Usage

Simply create a class and put annotations on its methods:

```typescript
import {EventSubscriber, On} from "event-dispatcher.ts/Annotations";

@EventSubscriber()
export class UserEventSubscriber {

    @On('onUserCreate')
    onUserCreate(user: User) {
        console.log('User ' + user.name + ' created!');
    }

    @On('onStatusUpdate')
    updateUserStatus(status: string) {
        console.log('New status: ' + status);
    }

}
```
Then use EventDispatcher class to dispatch events:

```typescript
import {EventDispatcher} from "event-dispatcher.ts/EventDispatcher";

require('./subscriber/UserEventSubscriber');
// you can also require the whole directory using: Utils.requireAll([__dirname + '/subscriber']);

let eventDispatcher = new EventDispatcher();

eventDispatcher.dispatch('onUserCreate', new User('Johny'));
eventDispatcher.dispatch('onStatusUpdate', 'hello world');

```

Take a look on samples in `./sample` for more examples of usages.

## Todos

* cover with tests
* more documentation