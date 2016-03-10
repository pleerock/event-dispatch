import {EventDispatcher} from "../../src/EventDispatcher";
import {User} from "./User";

import "./subscriber/UserEventSubscriber";

let eventDispatcher = new EventDispatcher();

let johny: User = { name: "Johny", age: 25 };
eventDispatcher.dispatch("onUserCreate", johny);
johny.name = "Johny Cage";
eventDispatcher.dispatch("onUserUpdate", johny);