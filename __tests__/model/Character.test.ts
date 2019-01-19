import Modifier from "../../src/ts/model/Modifier";
import Character from "../../src/ts/model/Character";
import Entity from "../../src/ts/model/abstract/Enitiy";
import RangedWeapon from "../../src/ts/model/Weapons/RangedWeapon";

describe('Character damaging other enitities', () => {
    const sandbag = new Entity();
    const character = new Character();
    const rifle = new RangedWeapon();

    rifle.damageMax = 10;
    rifle.damageMin = 10;

    sandbag.stats.endurance = 1;
    sandbag.stats.health = 100;

    character.equip(rifle);

    const damage = character.calculateDamage();
    sandbag.takeDamage(damage, []);

    expect(damage).toBe(10);
    expect(sandbag.stats.health).toBe(90);
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
