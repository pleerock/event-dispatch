import "es6-shim";
import {EventDispatcher} from "../../src/index";

interface User {
    name: string;
    age: number;
}

let johny: User = { name: "Johny", age: 25 };

let eventDispatcher = new EventDispatcher();
eventDispatcher.on("user_created", (user: User) => {
    console.log("User " + user.name + " has been created!");
});

eventDispatcher.dispatch("user_created", johny);

console.log("removing all 'user_created' events");
eventDispatcher.remove("user_created");

eventDispatcher.dispatch("user_created", johny);