import {EventDispatcher} from "../../src/event-dispatch";

interface User {
    name: string;
    age: number;
}

let eventDispatcher = new EventDispatcher();
eventDispatcher.on("user_created", (user: User) => {
    console.log("User " + user.name + " has been created!");
});

let johny: User = { name: "Johny", age: 25 };
eventDispatcher.dispatch("user_created", johny);