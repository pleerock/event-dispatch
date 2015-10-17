import {EventSubscriber, On} from "../../../src/Annotations";
import {User} from "./../User";

@EventSubscriber()
export class UserEventSubscriber {

    @On('onUserCreate')
    onUserCreate(user: User) {
        console.log('User ' + user.name + ' created!')
    }

    @On('onUserUpdate')
    updateData(user: User) {
        console.log('User ' + user.name + ' updated!')
    }

}