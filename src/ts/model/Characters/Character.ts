import Inventory from '../Inventory';
import Entity, { IStatistics } from '../abstract/Entity';
import Modifier from '../Modifier';
import Weapon from '../abstract/Weapon';
import Armor from '../abstract/Armor';
import RangedWeapon from '../Weapons/RangedWeapon';
import { WeaponComponent } from '../Weapons/WeaponSlots';

export default class Character extends Entity {
    name: string = '';
    inventory: Inventory = new Inventory(28);

    statistics: IStatistics = {
        awareness: 0,
        charisma: 0,
        dexterity: 0,
        endurance: 0,
        intelligence: 0,
        luck: 0,
        strength: 0,
        health: 0,
        stamina: 0,
    };

    effectsApplied: Modifier[] = [];

    get calculatedStats(): IStatistics {
        const stats = this.statistics;

        this.effectsApplied.forEach(effect => {
            if (effect.ticks === 0) return;

            stats.awareness += effect.awareness;
            stats.charisma += effect.charisma;
            stats.dexterity += effect.dexterity;
            stats.endurance += effect.endurance;
            stats.intelligence += effect.intelligence;
            stats.luck += effect.luck;
            stats.strength += effect.strength;
            stats.health += effect.health;
            stats.stamina += effect.stamina;
        });

        stats.awareness = stats.awareness >= 0 ? stats.awareness : 0;
        stats.charisma = stats.charisma >= 0 ? stats.charisma : 0;
        stats.dexterity = stats.dexterity >= 0 ? stats.dexterity : 0;
        stats.endurance = stats.endurance >= 0 ? stats.endurance : 0;
        stats.intelligence = stats.intelligence >= 0 ? stats.intelligence : 0;
        stats.luck = stats.luck >= 0 ? stats.luck : 0;
        stats.strength = stats.strength >= 0 ? stats.strength : 0;
        stats.health = stats.health >= 0 ? stats.health : 0;
        stats.stamina = stats.stamina >= 0 ? stats.stamina : 0;

        return stats;
    }

    constructor(id: string = '') {
        super(id);
    }
}
