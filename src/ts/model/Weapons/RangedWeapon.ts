import Weapon from "../abstract/Weapon";
import IWeaponSlots from "./WeaponSlots";

export default class RangedWeapon extends Weapon {
    range: number = 0;

    ammoType: string = '';
    fireRate: number = 0;

    burst: number = 1;

    reloadSpeed: number = 0;

    slots: IWeaponSlots = {
    };

    canAttack(): boolean {
        if (!super.canAttack()) {
            return false;
        }

        if (this.slots.magasine === undefined) {
            return false;
        }

        if (this.slots.magasine.ammoLoaded === 0) {
            return false;
        }

        return true;
    }

    reload(ammo: number) {
        if ((this.slots.magasine.ammoLoaded + ammo) > this.slots.magasine.capacity) {
            this.slots.magasine.ammoLoaded = this.slots.magasine.capacity;
            return;
        }
        this.slots.magasine.ammoLoaded += ammo;
    }

    use() {
        // If we can't fire don't do anything
        if (!this.canAttack) return false;
        // Check if the weapon is broken and knock down its durability
        if (!super.use()) return false;
        // Remove one bullet from the clip
        this.slots.magasine.ammoLoaded--;
    }
}
