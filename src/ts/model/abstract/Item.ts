import Modifier from '../Modifier';
import Entity from './Entity';

export default class Item extends Entity {
    name: string = '';
    noun: string = ''; // shorthand name for lookups
    weight: number = 0;
    value: number = 0;

    effects: Modifier[] = [];

    constructor(public id: string = '') {
        super(id);
        this.weight = 1;
    }

    /**
     * use
     * @return {boolean} whether this item has been consumed or not
     */
    use(): boolean {
        if (this.stats.health > 0) {
            this.stats.health--;
        }

        if (this.stats.health === 0) return false;

        return true;
    }
}
