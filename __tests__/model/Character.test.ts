import Modifier from "../../src/ts/model/Modifier";
import Character from "../../src/ts/model/Character";
import Entity from "../../src/ts/model/abstract/Enitiy";
import RangedWeapon from "../../src/ts/model/Weapons/RangedWeapon";

describe('Character damaging other enitities', () => {
    it('should allow a character to damage another entity', () => {
        const sandbag = new Entity();
        const character = new Character();
        const rifle = new RangedWeapon();

        rifle.damageMax = 10;
        rifle.damageMin = 10;

        sandbag.stats.endurance = 1;
        sandbag.stats.health = 100;

        character.equip(rifle);

        let damage = character.calculateDamage();
        sandbag.takeDamage(damage, []);

        expect(damage).toBe(10);
        expect(sandbag.stats.health).toBe(90);
    });

    it('should limit the damage based on the entities endurance (5 endurance)', () => {
        const sandbag = new Entity();
        const character = new Character();
        const rifle = new RangedWeapon();

        rifle.damageMax = 10;
        rifle.damageMin = 10;

        character.equip(rifle);

        sandbag.stats.endurance = 5;
        sandbag.stats.health = 100;

        const damage = character.calculateDamage();
        sandbag.takeDamage(damage, []);

        expect(damage).toBe(10);
        expect(sandbag.stats.health).toBe(91);
    });

    it('should limit the damage based on the entities endurance (10 endurance)', () => {
        const sandbag = new Entity();
        const character = new Character();
        const rifle = new RangedWeapon();

        rifle.damageMax = 10;
        rifle.damageMin = 10;

        character.equip(rifle);

        sandbag.stats.endurance = 10;
        sandbag.stats.health = 100;

        const damage = character.calculateDamage();
        sandbag.takeDamage(damage, []);

        expect(damage).toBe(10);
        expect(sandbag.stats.health).toBe(92);
    });
});

describe('Character trying to damage indestructable enitities', () => {
    const sandbag = new Entity();
    const character = new Character();
    const rifle = new RangedWeapon();

    rifle.damageMax = 10;
    rifle.damageMin = 10;

    character.equip(rifle);

    const damage = character.calculateDamage();
    sandbag.takeDamage(damage, []);

    expect(damage).toBe(10);
    expect(sandbag.stats.health).toBe(-1);
});



describe('Effects of modifiers on a character', () => {
    it('should increase the characters stats', () => {
        const character = new Character();
        const mod = new Modifier('health-boost');
        mod.health = 10;
        character.statistics.health = 100;
        character.effectsApplied.push(mod);

        expect(character.calculatedStats.health).toBe(110);
    });

    it('should decrease the characters stats', () => {
        const character = new Character();
        const mod = new Modifier('health-drain');
        mod.health = -10;
        character.statistics.health = 100;
        character.effectsApplied.push(mod);

        expect(character.calculatedStats.health).toBe(90);
    });
});
