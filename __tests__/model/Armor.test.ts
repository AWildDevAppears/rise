import Humanoid from '../../src/ts/model/Characters/Humanoid';
import Armor from '../../src/ts/model/abstract/Armor';

describe('Armor tests', () => {
    it('should let a character equip an item of armor', () => {
        const character = new Humanoid();
        const armor = new Armor();
        armor.armorType = 'chest';
        armor.id = 'chest-armor';

        character.equip(armor);

        expect(character.equipment.chest.id).toBe(armor.id);
    });

    it('should negate some damage to a character wearing armor', () => {
        const character = new Humanoid();
        const armor = new Armor();
        armor.armorType = 'chest';
        armor.defence = 10;

        character.stats.health = 100;

        character.equip(armor);

        character.takeDamage(10);

        expect(character.stats.health).toBe(91);
    });

    it('should never equate to zero damage', () => {
        const character = new Humanoid();
        const armor = new Armor();
        armor.armorType = 'chest';
        armor.defence = 1000;

        character.stats.health = 100;

        character.equip(armor);

        character.takeDamage(10);

        expect(character.stats.health).toBe(99);
    });

    it('should not negate damage when the player is wearing broken armor', () => {
        const character = new Humanoid();
        const armor = new Armor();
        armor.armorType = 'chest';
        armor.defence = 10;
        armor.stats.health = 0;

        character.stats.health = 100;

        character.equip(armor);

        character.takeDamage(10);

        expect(character.stats.health).toBe(90);
    });
});
