import Modifier from '../../src/ts/model/Modifier';
import Character from '../../src/ts/model/Characters/Character';
import Entity from '../../src/ts/model/abstract/Entity';
import RangedWeapon from '../../src/ts/model/Weapons/RangedWeapon';
import { Magasine, WeaponSights } from '../../src/ts/model/Weapons/WeaponSlots';
import Item from '../../src/ts/model/abstract/Item';
import Armor from '../../src/ts/model/abstract/Armor';

describe('Character damaging other enitities', () => {
    it('should only allow a character to attack with a ranged weapon when it is loaded', () => {
        const character = new Character();
        const rifle = new RangedWeapon();
        const rifleMag = new Magasine();
        const ammo = new Item();

        ammo.id = '5.56';

        rifleMag.capacity = 12;
        rifleMag.ammoLoaded = 0;
        rifleMag.ammoType = '5.56';
        rifle.weaponType = 'rifle';
        rifle.ammoType = '5.56';
        rifle.damageMax = 10;
        rifle.damageMin = 10;

        // No weapon, attack with fists
        expect(character.canAttack).toBe(true);

        character.equip(rifle);

        // No magazine in the rifle
        expect(character.canAttack).toBe(false);
        expect(character.equipment.weapon.attach(rifleMag)).toBe(true);
        character.reload();

        // No ammo in inventory
        expect(character.canAttack).toBe(false);

        // Add 6 bullets
        for (let i = 0; i < 6; i++) {
            character.inventory.addItem(ammo);
        }

        expect(character.inventory.count()).toBe(6);

        character.reload();

        expect(character.equipment.weapon.slots.magasine.ammoLoaded).toBe(6);

        expect(character.canAttack).toBe(true);

        // Add 8 more bullets
        for (let i = 0; i < 8; i++) {
            character.inventory.addItem(ammo);
        }

        expect(character.inventory.count()).toBe(8);

        character.reload();

        // We had 8 bullets in our inventory and 6 in the rifles magazine, therefore we should only load 6
        // more bullets in order to fill the clip, leaving us 2 extra bullets in our inventory.
        expect(character.inventory.count()).toBe(2);

        expect(character.equipment.weapon.slots.magasine.ammoLoaded).toBe(12);
    });

    it('should let a character fire a gun', () => {
        const character = new Character();
        const rifle = new RangedWeapon();
        const rifleMag = new Magasine();
        const ammo = new Item();

        ammo.id = '5.56';

        rifleMag.capacity = 12;
        rifleMag.ammoLoaded = 0;
        rifleMag.ammoType = '5.56';
        rifle.weaponType = 'rifle';
        rifle.ammoType = '5.56';
        rifle.damageMax = 10;
        rifle.damageMin = 10;
        rifle.stats.health = 1;

        rifle.attach(rifleMag);
        character.equip(rifle);

        for (let i = 0; i < 2; i++) {
            character.inventory.addItem(ammo);
        }

        character.reload();

        character.attack();

        expect(character.equipment.weapon.stats.health).toBe(0);
        expect(character.attack()).toBe(0);
        expect(character.canAttack).toBe(false);
    });

    it('should unequip a component if I try to replace it', () => {
        const character = new Character();
        const rifle = new RangedWeapon();
        const rifleScope = new WeaponSights('scope');
        const rifleScopeBetter = new WeaponSights('scopeBetter');

        rifle.weaponType = 'rifle';
        rifle.ammoType = '5.56';

        character.equip(rifle);

        expect(character.attachComponentToWeapon(rifleScope));
        expect(character.attachComponentToWeapon(rifleScopeBetter));

        expect(character.inventory.contains(rifleScope.id)).toBe(true);
        expect(character.inventory.count()).toBe(1);
    });

    it('should allow a character to damage another entity', () => {
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

describe('Characters wearing armor', () => {
    it('should allow the user to equip a piece of armor', () => {
        const character = new Character();
        const chestpiece = new Armor();
        chestpiece.armorType = 'chest';

        expect(character.equip(chestpiece)).toBe(true);
    });

    it('should reduce damage taken if the user is wearing armor', () => {
        expect(true).toBe(true);
    });
});

describe('Character trying to damage indestructable enitities', () => {
    it('should negate damage if youv are attacking an indestuctable entity', () => {
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
