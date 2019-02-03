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

export default class Weapon extends Item {
    damageMin: number = 0;
    damageMax: number = 0;

    attackSpeed: number = 0;
    weaponType: string;

    modifiers: Modifier[] = [];

    slots: IWeaponSlots = {};

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
}
