import Recipe from '../../src/ts/model/crafting/Recipe';
import RangedWeapon from '../../src/ts/model/Weapons/RangedWeapon';
import Humanoid from '../../src/ts/model/Characters/Humanoid';
import Item from '../../src/ts/model/abstract/Item';

describe('Crafting', () => {
    it('should let me combine items together to make a weapon', () => {
        const recipe = new Recipe();
        const rifle = new RangedWeapon();
        const character = new Humanoid();

        const weaponScrap = new Item();
        const rifledBarrel = new Item();
        const rifleFiringKit = new Item();
        const boltKit = new Item();

        weaponScrap.id = 'weapon-scrap';
        rifledBarrel.id = 'rifled-barrel';
        rifleFiringKit.id = 'rifle-firing-kit';
        boltKit.id = 'bolt-kit';

        rifle.ammoType = 'medium-ammo';
        rifle.attackSpeed = 6;
        rifle.id = 'test-bolt-action';

        recipe.ingredients = {
            'weapon-scrap': 6,
            'rifled-barrel': 1,
            'rifle-firing-kit': 1,
            'bolt-kit': 2,
        };

        recipe.output = rifle;

        // Can't craft anything without the ingredients
        expect(character.craft(recipe)).toBe(false);

        for (let i = 0; i < 6; i++) {
            character.inventory.addItem(weaponScrap);
        }

        character.inventory.addItem(rifledBarrel);
        character.inventory.addItem(rifleFiringKit);

        for (let i = 0; i < 2; i++) {
            character.inventory.addItem(boltKit);
        }

        // Character has all of the required components to make this item
        expect(character.craft(recipe)).toBe(true);

        // All of the items should have been consumed and only the item to remain
        expect(character.inventory.count()).toBe(1);
    });
});
