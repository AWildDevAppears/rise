import Structure from './Structure';
import Inventory from '../Inventory';

export default class Container extends Structure {
    inventory: Inventory = new Inventory(12);
    
    use() {
        // open a trade window with this container.
    };
}
