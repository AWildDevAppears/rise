import Item from "../abstract/Item";

export default interface IWeaponSlots {
    muzzle?: WeaponMuzzle;
    body?: WeaponBody;
    stock?: WeaponStock;
    grip?: WeaponGrip;
    magasine?: Magasine;
};

export class WeaponComponent extends Item {
    bindTo: string = '';
}

export class WeaponMuzzle extends WeaponComponent {

}

export class WeaponBody extends WeaponComponent {

}

export class WeaponStock extends WeaponComponent {

}

export class WeaponGrip extends WeaponComponent {

}

export class Magasine extends WeaponComponent {
    bindTo = 'magasine';
    capacity: number = 1;
    ammoType: string = '';
    ammoLoaded: number = 0;
}
