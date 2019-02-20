import Item from './abstract/Item';
import Modifier from './Modifier';

export default class Inventory {
    private itemList: Item[] = [];
    private weight: number = 0;

    constructor(private maxWeight: number) {}

    /**
     * addItem
     * @param {Item} item - the item to add to the inventory
     * @param {number} count - the number of items of this type to add
     * @return {boolean} whether the process was completely successful or not
     */
    addItem(item: Item, count: number = 1): boolean {
        for (let i = 0; i < count; i++) {
            if (this.weight + item.weight > this.maxWeight) {
                return false;
            }
            this.itemList.push(item);
            this.weight += item.weight;
        }

        return true;
    }

    /**
     * removeItem
     * @param {string} itemId - Id of the item we wassnt to remove
     * @return {boolean} whether the process was completely successful or not
     */
    removeItem(itemId: string): boolean {
        var removed = false;

        this.itemList.some((item: Item, pos: number) => {
            if (item.id == itemId) {
                this.itemList.splice(pos, 1);
                removed = true;
                return true;
            }
        });

        return removed;
    }

    /**
     * removeItem
     * @param {number} pos - index of the item we want to remove
     * @return {boolean} whether the process was completely successful or not
     */
    removeItemAtPos(pos: number): boolean {
        if (this.itemList[pos]) {
            this.itemList.splice(pos, 1);
            return true;
        }

        return false;
    }

    contains(key: string, amount: number = 1): boolean {
        let count = 0;
        this.itemList.forEach(item => {
            if (item.id === key) {
                count++;
            }
        });

        return count >= amount;
    }

    count(): number {
        return this.itemList.length;
    }

    countOfItem(key: string): number {
        let count = 0;

        this.itemList.forEach(item => {
            if (item.id === key) {
                count++;
            }
        });

        return count;
    }

    /**
     * asObject
     * @return {{[key: string]: number}} The inventory as an object of keys to counts of items
     */
    asObject(): { [key: string]: number } {
        var items: { [key: string]: number } = {};

        this.itemList.forEach((item: Item) => {
            var id = item.stats.health > -1 ? `${item.id}:${item.stats.health}` : item.id;

            if (items[id]) {
                items[id]++;
                return;
            }

            items[id] = 1;
        });

        return items;
    }

    /**
     * useItem
     * @param {string} id - Id of the item to use
     * @return {Modifier[]} modifiers that said item applies
     */
    useItem(id: string): Modifier[] {
        var i = -1;
        this.itemList.some((item: Item, pos: number) => {
            if (item.id == id) {
                i = pos;
                return true;
            }
        });

        if (i === -1) {
            return;
        }

        const item = this.itemList[i];

        // If the item is depleted, remove it
        if (!item.use()) {
            this.removeItemAtPos(i);
        }

        return item.effects.length > 0 ? item.effects : undefined;
    }
}
