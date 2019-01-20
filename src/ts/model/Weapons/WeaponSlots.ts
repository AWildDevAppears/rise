import Item from "../abstract/Item";

export default interface IWeaponSlots {
    muzzle?: WeaponMuzzle;
    body?: WeaponBody;
    stock?: WeaponStock;
    grip?: WeaponGrip;
    magasine: Magasine;
};

export class WeaponMuzzle extends Item {

}

export class WeaponBody extends Item {

}

export class WeaponStock extends Item {

}

export class WeaponGrip extends Item {

}

export class Magasine extends Item {
    capacity: number = 1;
    ammoType: string = '';
    ammoLoaded: number = 0;
}
