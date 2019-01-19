import Weapon from "../abstract/Weapon";
import IWeaponSlots from "./WeaponSlots";

export default class RangedWeapon extends Weapon {
    range: number = 0;

    ammoType: string = '';
    fireRate: number = 0;

    burst: number = 1;

    reloadSpeed: number = 0;

    slots: IWeaponSlots = {
        magasine: undefined,
    };
}
