import Item from "../abstract/Item";

export default interface IWeaponSlots {
    muzzle?: WeaponMuzzle;
    body?: WeaponBody;
    stock?: WeaponStock;
    grip?: WeaponGrip;

};

export class WeaponMuzzle extends Item {

}

export class WeaponBody extends Item {

}

export class WeaponStock extends Item {

}

export class WeaponGrip extends Item {

}
