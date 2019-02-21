import Inventory from '../../src/ts/model/Inventory';
import Item from '../../src/ts/model/abstract/Item';
import Modifier from '../../src/ts/model/Modifier';

describe('Adding and removing items', () => {
    it('should allow me to add an item to my inventory', () => {
        const inv = new Inventory(1);
        const item = new Item('this-is-id');

        expect(inv.addItem(item)).toBe(true);
    });

    it('should not allow me to add an item to a full inventory', () => {
        const inv = new Inventory(1);
        const item = new Item('this-is-id');

        expect(inv.addItem(item, 2)).toBe(false);
    });

    it("shouldn't let me remove an item I don't have", () => {
        const inv = new Inventory(1);

        expect(inv.removeItem('this-is-id')).toBe(false);
        expect(inv.removeItemAtPos(1)).toBe(false);
    });

    it('should allow me to remove an item I have', () => {
        const inv = new Inventory(1);
        const item = new Item('id');

        inv.addItem(item);

        expect(inv.removeItem(item.id)).toBe(true);
    });
});

describe('getting your inventory as a map', () => {
    it('should return an accurate keyed map of the items I have', () => {
        const inv = new Inventory(10);
        inv.addItem(new Item('this-is-id'), 2);
        inv.addItem(new Item('this-is-id-2'));

        const obj = inv.asObject();

        expect(obj['this-is-id']).toBe(2);
        expect(obj['this-is-id-2']).toBe(1);
    });
});

describe('Using items', () => {
    it("shouldn't let me use an item with no use", () => {
        const inv = new Inventory(1);
        const item = new Item('this-is-id');

        inv.addItem(item, 1);

        expect(inv.useItem('this-is-id')).toBe(undefined);
    });

    it('should let me use an item that can be used', () => {
        const inv = new Inventory(1);
        const item = new Item('this-is-id');
        item.stats.health = 10;
        item.effects = [new Modifier('modifier-id')];

        inv.addItem(item, 1);

        const use = inv.useItem('this-is-id');

        expect(Array.isArray(use)).toBe(true);
    });

    it("should remove an item if it's used up", () => {
        const inv = new Inventory(1);
        const item = new Item('this-is-id');
        item.stats.health = 1;
        item.effects = [new Modifier('modifier-id')];

        inv.addItem(item, 1);

        const use = inv.useItem('this-is-id');

        expect(Array.isArray(use)).toBe(true);
        expect(inv.removeItem('this-is-id')).toBe(false);
    });

    it("should not allow me to use an item I don't have", () => {
        const inv = new Inventory(1);
        expect(inv.useItem('not-an-item')).toBeUndefined();
    });
});
