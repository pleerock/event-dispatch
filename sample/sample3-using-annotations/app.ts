import {EventDispatcher} from "../../src/EventDispatcher";
import {Utils} from "../../src/Utils";
import {User} from "./User";

require('./subscriber/UserEventSubscriber');
// you can also require the whole directory using: Utils.requireAll([__dirname + '/subscriber']);

let eventDispatcher = new EventDispatcher();

let johny: User = { name: 'Johny', age: 25 };
eventDispatcher.dispatch('onUserCreate', johny);
johny.name = 'Johny Cage';
eventDispatcher.dispatch('onUserUpdate', johny);