import Modifier from '../Modifier';

export default class Item {
    name: string = '';
    weight: number = 0;
    durability: number = -1;

    effects: Modifier[] = [];

    constructor(public id: string = '') {
        this.weight = 1;
    }

    /**
     * use
     * @return {boolean} whether this item has been consumed or not
     */
    use(): boolean {
        if (this.durability > 0) {
            this.durability--;
        }

        if (this.durability === 0) return true;

        return false;
    }
}
