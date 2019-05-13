import Structure from './Structure';
import Item from '../abstract/Item';

type EventTrigger = 'player' | 'item' | 'null';

// Anything that can be used to change the state of another object
// This could be a switch that activates a light, a pressure plate that triggers a trap
// Or even an alter that you need to place another object on to open a secret passage.
export class Trigger extends Structure {
    isTriggeredBy: EventTrigger = 'null';

    constructor(id: string = '', tirgger: EventTrigger, method: (item?: Item) => boolean) {
        super(id);
    }
}
