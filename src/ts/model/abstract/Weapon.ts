import Item from "./Item";
import Modifier from "../Modifier";
import IWeaponSlots, { WeaponComponent } from "../Weapons/WeaponSlots";

const WEAPON_SLOTS = {
    '_': ['muzzle', 'barrel', 'body', 'stock', 'grip', 'sights', 'magasine'],
    'rifle': ['muzzle', 'barrel', 'body', 'stock', 'sights', 'magasine'],
    'ar': ['muzzle', 'barrel', 'body', 'stock', 'sights', 'magasine'],
    'pistol': ['muzzle', 'body', 'grip', 'sights', 'magasine'],
    'revolver': ['body', 'grip', 'sights', 'magasine'],
    'shotgun': ['barrel', 'body', 'stock', 'magasine'],
    'lmg': ['barrel', 'body', 'stock', 'sights', 'magasine'],
    'smg': ['muzzle', 'body', 'stock', 'grip', 'sights', 'magasine'],
    'bow': ['barrel', 'body', 'grip', 'sights', 'magasine'],
}

interface IWeaponStats {
    health: number;
    endurance: number;
    accuracy?: number;
}

export default class Weapon extends Item {
    damageMin: number = 0;
    damageMax: number = 0;

    attackSpeed: number = 0;
    weaponType: string;

    modifiers: Modifier[] = [];

    slots: IWeaponSlots = {};

    stats: IWeaponStats = {
        health: -1,
        endurance: 0,
    }

    get calculatedStats() {
        const stats = { ...this.stats };

        for (let component in this.slots) {
            for (let key in this.slots[component]) {
                if (this.stats[key]) {
                    stats[key] += this.slots[component][key];
                }
            }
        }

        return stats;
    }

    canAttack(): boolean {
        return this.stats.health !== 0;
    }

    attach(component: WeaponComponent): boolean {
        if (WEAPON_SLOTS[this.weaponType].indexOf(component.bindTo) !== -1) {
            this.slots[component.bindTo] = component;
            return true;
        }

        return false;
    }

    remove(slot: string): false|WeaponComponent {
        if (!this.slots[slot]) return false;
        if (this.slots[slot].fixed) return false;

        const component = this.slots[slot];
        this.slots[slot] = undefined;

        return component;
    }
}
