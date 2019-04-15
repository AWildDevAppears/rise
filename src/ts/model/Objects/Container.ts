import Structure from './Structure';
import Inventory from '../Inventory';

export default class Container extends Structure {
    inventory: Inventory = new Inventory(0);

    use() {
        this.stats.isActive = !this.stats.isActive;

        // open a trade window with this container.
    }
}
