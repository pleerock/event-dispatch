# event-dispatcher.ts

Allows to register subscribers and dispatch events across the application.

## Installation

1. Install module:

    `npm install event-dispatcher.ts --save`

2. Use [typings](https://github.com/typings/typings) to install all required definition dependencies.

    `typings install`

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    if you are building nodejs app, you may want to `require("es6-shim");` in your app.
    or if you are building web app, you man want to add `<script src="path-to-shim/es6-shim.js">` on your page.

## Usage

Simply create a class and put annotations on its methods:

```typescript
import {EventSubscriber, On} from "event-dispatcher.ts/Decorators";

@EventSubscriber()
export class UserEventSubscriber {

    @On("onUserCreate")
    onUserCreate(user: User) {
        console.log("User " + user.name + " created!");
    }

    @On("onStatusUpdate")
    updateUserStatus(status: string) {
        console.log("New status: " + status);
    }

}
```
Then use EventDispatcher class to dispatch events:

```typescript
import {EventDispatcher} from "event-dispatcher.ts/EventDispatcher";

// note that all your subscribers must be imported somewhere in the app, so they are getting registered
// on node you can also require the whole directory using [require all](https://www.npmjs.com/package/require-all) package

import "./subscriber/UserEventSubscriber";

let eventDispatcher = new EventDispatcher();
eventDispatcher.dispatch("onUserCreate", new User("Johny"));
eventDispatcher.dispatch("onStatusUpdate", "hello world");
```

## Samples

Take a look on samples in [./sample](https://github.com/pleerock/event-dispatcher.ts/tree/master/sample) for more
examples of usages.

## Todos

* cover with tests
* more documentation