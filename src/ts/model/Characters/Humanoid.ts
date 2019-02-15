import Weapon from '../abstract/Weapon';
import Armor from '../abstract/Armor';
import Character from './Character';
import RangedWeapon from '../Weapons/RangedWeapon';
import { WeaponComponent } from '../Weapons/WeaponSlots';
import Recipe from '../crafting/Recipe';

export interface IEquipment {
    weapon: Weapon;
    head: Armor;
    chest: Armor;
    legs: Armor;
    boots: Armor;
    gloves: Armor;
}

const DEFENCE_MODIFIER = 0.12;

export default class Humanoid extends Character {
    equipment: IEquipment = {
        weapon: undefined,
        head: undefined,
        chest: undefined,
        legs: undefined,
        boots: undefined,
        gloves: undefined,
    };

    get canAttack(): boolean {
        if (!this.equipment.weapon) {
            // Use fists to attack
            return true;
        }

        return this.equipment.weapon.canAttack();
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

    attack(): number {
        if (!this.canAttack) {
            return 0;
        }

        if (this.equipment.weapon) {
            this.equipment.weapon.use();
        }

        return this.calculateDamage();
    }

    equip(item: Weapon | Armor) {
        if (item instanceof Weapon) {
            if (this.equipment.weapon) {
                if (!this.inventory.addItem(this.equipment.weapon)) {
                    return false;
                }
            }

            this.equipment.weapon = item;
            return true;
        }

        if (!(item as Armor).armorType) {
            return false;
        }

        item = item as Armor;

        if (this.equipment[item.armorType]) {
            if (!this.inventory.addItem(this.equipment[item.armorType])) {
                return false;
            }
        }

        this.equipment[item.armorType] = item;
        return true;
    }

    calculateDamage(): number {
        if (this.equipment.weapon) {
            const weapon = this.equipment.weapon;

            let armorDefence = 0;

            if (this.defence > 0) {
                armorDefence = this.defence / DEFENCE_MODIFIER;
            }

            const weaponDamage = weapon.calculateDamage();

            return Math.floor(weaponDamage - armorDefence);
        } else {
            return 0;
        }
    }

    attachComponentToWeapon(component: WeaponComponent): boolean {
        let oldItem: WeaponComponent;
        if (this.equipment.weapon.slots[component.bindTo]) {
            oldItem = this.equipment.weapon.slots[component.bindTo];
        }

        if (this.equipment.weapon.attach(component)) {
            if (oldItem) {
                this.inventory.addItem(oldItem);
            }
            return true;
        }

        return false;
    }

    reload() {
        if (this.equipment.weapon instanceof RangedWeapon) {
            const ammoType = this.equipment.weapon.ammoType;
            if (this.inventory.contains(ammoType)) {
                const count = this.inventory.countOfItem(ammoType);
                const maxAmmoCount = this.equipment.weapon.slots.magasine.capacity;
                const ammoLoaded = this.equipment.weapon.slots.magasine.ammoLoaded;

                let ammoToLoad = 0;
                if (count === 0) {
                    return;
                }

                ammoToLoad = count > maxAmmoCount ? maxAmmoCount : count;

                if (ammoToLoad + ammoLoaded > maxAmmoCount) {
                    ammoToLoad = maxAmmoCount - ammoLoaded;
                }

                for (let i = 0; i < ammoToLoad; i++) {
                    this.inventory.removeItem(ammoType);
                }

                (this.equipment.weapon as RangedWeapon).reload(ammoToLoad);
            }
        }
    }

    craft(recipe: Recipe): boolean {
        // Check if we can craft the item
        for (let k in recipe.ingredients) {
            if (!this.inventory.contains(k, recipe.ingredients[k])) {
                return false;
            }
        }

        for (let k in recipe.ingredients) {
            for (let i = 0; i < recipe.ingredients[k]; i++) {
                this.inventory.removeItem(k);
            }
        }

        this.inventory.addItem(recipe.output);
        return true;
    }
}
