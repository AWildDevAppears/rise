import Inventory from '../Inventory';
import Entity, { IStatistics } from '../abstract/Entity';
import Modifier from '../Modifier';
import Weapon from '../abstract/Weapon';
import Armor from '../abstract/Armor';
import RangedWeapon from '../Weapons/RangedWeapon';
import { WeaponComponent } from '../Weapons/WeaponSlots';
import Item from '../abstract/Item';

export default class Character extends Entity {
    name: string = '';
    inventory: Inventory = new Inventory(28);

    stats: IStatistics = {
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

    resistances: string[] = [];

    effectsApplied: Modifier[] = [];

    get calculatedStats(): IStatistics {
        const stats = this.stats;

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

    addModifier(mod: Modifier) {
        const effects = this.effectsApplied.map(m => m.id);
        const index = effects.indexOf(mod.id);

        // Can't apply a status effect to a character that is resistant to it.
        if (this.resistances.indexOf(mod.id) !== -1) {
            return;
        }

        if (index !== -1) {
            this.effectsApplied.splice(index, 1);
        }

        mod.negates.forEach(m => {
            const i = effects.indexOf(m);
            if (i !== -1) {
                this.effectsApplied.splice(i, 1);
                effects.splice(i, 1);
            }
        });

        this.effectsApplied.push(mod);
    }

    calculateDamage() {
        return this.stats.strength * 5;
    }

    useItem(item: Item): boolean {
        if (!item.use()) {
            return false;
        }
        
        item.effects.forEach(mod => {
            this.addModifier(mod);
        });

        return true;
    }

    constructor(id: string = '') {
        super(id);
    }
}
