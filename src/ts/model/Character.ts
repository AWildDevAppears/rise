import Inventory from "./Inventory";
import Entity, { IStatistics } from "./abstract/Entity";
import Modifier from "./Modifier";
import Weapon from "./abstract/Weapon";
import Armor from "./abstract/Armor";
import RangedWeapon from "./Weapons/RangedWeapon";

export interface IEquipment {
    weapon: Weapon;
    head: Armor;
    chest: Armor;
    legs: Armor;
    boots: Armor;
    gloves: Armor;
}

const DEFENCE_MODIFIER = 0.12;

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

    equipment: IEquipment = {
        weapon: undefined,
        head: undefined,
        chest: undefined,
        legs: undefined,
        boots: undefined,
        gloves: undefined,
    }

    effectsApplied: Modifier[] = [];

    get calculatedStats(): IStatistics {
        const stats = this.statistics;

        this.effectsApplied.forEach((effect) => {
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

    get canAttack(): boolean {
        if (!this.equipment.weapon) {
            // Use fists to attack
            return true;
        }

        return this.equipment.weapon.canAttack;
    }

    get defence(): number {
        let defence = 0;

        defence += this.equipment.boots ? this.equipment.boots.defence : 0;
        defence += this.equipment.chest ? this.equipment.chest.defence : 0;
        defence += this.equipment.gloves ? this.equipment.gloves.defence : 0;
        defence += this.equipment.head ? this.equipment.head.defence : 0;
        defence += this.equipment.legs ? this.equipment.legs.defence : 0;

        return defence;
    }

    constructor(id: string = '') {
        super(id);
    }

    equip(item: (Weapon | Armor)) {
        if (item instanceof Weapon) {
            if (this.equipment.weapon) {
                this.inventory.addItem(this.equipment.weapon);
            }

            this.equipment.weapon = item;
        }
   }

    calculateDamage(): number {
        if (this.equipment.weapon) {
            const weapon = this.equipment.weapon;

            let armorDefence = 0;

            if (this.defence > 0) {
                armorDefence = this.defence / DEFENCE_MODIFIER;
            }

            const weaponDamage = (Math.random() * (weapon.damageMax - weapon.damageMin + 1)) + weapon.damageMin;

            return Math.floor(weaponDamage - armorDefence);
        } else {
            return 0;
        }
    }

    reload() {
        if (this.equipment.weapon instanceof RangedWeapon) {
            const ammoType = this.equipment.weapon.ammoType
            if (this.inventory.contains(ammoType)) {
                const count = this.inventory.countOfItem(ammoType);
                const maxAmmoCount = this.equipment.weapon.slots.magasine.capacity;

                let ammoToLoad = 0;
                if (count === 0) {
                    return;
                }

                ammoToLoad = count > maxAmmoCount ? maxAmmoCount : count;

                for (let i = 0; i < ammoToLoad; i++) {
                    this.inventory.removeItem(ammoType);
                }

                (this.equipment.weapon as RangedWeapon).reload(ammoToLoad);
            }

            return;
        }
    }
}
