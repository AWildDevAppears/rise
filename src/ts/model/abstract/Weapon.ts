import Item from "./Item";
import Modifier from "../Modifier";
import IWeaponSlots, { WeaponComponent } from "../Weapons/WeaponSlots";

const WEAPON_SLOTS = {
    'rifle': ['magasine', 'stock', 'muzzle', 'body'],
    'ar': ['magasine', 'stock', 'muzzle', 'body', 'grip'],
}


export default class Weapon extends Item {
    damageMin: number = 0;
    damageMax: number = 0;

    attackSpeed: number = 0;
    weaponType: string;

    modifiers: Modifier[] = [];

    slots: IWeaponSlots = {};


    get canAttack(): boolean {
        return false;
    }

    attach(component: WeaponComponent): boolean {
        if (WEAPON_SLOTS[this.weaponType].indexOf(component.bindTo) !== -1) {
            this.slots[component.bindTo] = component;
            return true;
        }

        return false;
    }
}
