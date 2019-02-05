import Weapon from "../abstract/Weapon";
import IWeaponSlots from "./WeaponSlots";

export default class RangedWeapon extends Weapon {
    ammoType: string = '';

    slots: IWeaponSlots = {
    };

    stats = {
        health: -1,
        endurance: 0,
        accuracy: 0,
        fireRate: 0,
        burst: 1,
        reloadSpeed: 0,
        range: 0,
    }

    get calculatedStats() {
        return this.stats;
    }

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
