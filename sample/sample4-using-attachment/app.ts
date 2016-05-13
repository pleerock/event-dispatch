import "es6-shim";
import {EventDispatcher} from "../../src/index";

interface User {
    name: string;
    age: number;
}

let eventDispatcher = new EventDispatcher();

class Controller {
    
    init() {
        eventDispatcher.attach(this, "user_created", () => {
            console.log("hello from controller");
        });
    }
    
    destroy() {
        eventDispatcher.detach(this);
    }
    
}

let johny: User = { name: "Johny", age: 25 };
eventDispatcher.on("user_created", () => {
    console.log("hello from global");
});

const controller = new Controller();
controller.init();
eventDispatcher.dispatch("user_created", johny); // this will be sent to both
controller.destroy();
eventDispatcher.dispatch("user_created", johny);// this will be sent to one