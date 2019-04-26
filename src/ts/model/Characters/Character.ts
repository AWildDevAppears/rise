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
    description: string = '';
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
        moveSpeed: 0,
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
            stats.moveSpeed += effect.moveSpeed;
        });

        // Ensure we don't have negative stats
        for (let k in stats) {
            stats[k] = stats[k] >= 0 ? stats[k] : 0;
        }

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

        if (!mod.buffs) {
            return;
        }

        mod.buffs.forEach(buff => {
            const buffedModId = this.effectsApplied.map(m => m.id).indexOf(buff.key);

            if (buffedModId === -1) {
                return;
            }

            const buffedMod = this.effectsApplied[buffedModId];
            const buffer = new Modifier(`buff:${buffedMod.id}:${mod.id}`);

            for (let k in buffer) {
                buffer[k] = buffedMod[k] * (buff.percentage / 100);
            }

            this.effectsApplied.push(buffer);
        });
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
