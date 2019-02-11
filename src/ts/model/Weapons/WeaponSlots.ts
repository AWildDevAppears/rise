import Item from '../abstract/Item';

export default interface IWeaponSlots {
    muzzle?: WeaponMuzzle;
    body?: WeaponBody;
    stock?: WeaponStock;
    grip?: WeaponGrip;
    magasine?: Magasine;
    sights?: WeaponSights;
    barrel?: WeaponBarrel;
}

export class WeaponComponent extends Item {
    bindTo: string = '';
    fixed: boolean = false;
}

export class WeaponMuzzle extends WeaponComponent {
    bindTo = 'muzzle';
    range: number = 0;
    damage: number = 0;
}

export class WeaponBarrel extends WeaponComponent {
    bindTo = 'barrel';
    range: number = 0;
    accuracy: number = 0;
    damage: number = 0;
}

export class WeaponBody extends WeaponComponent {
    bindTo = 'body';
    damage: number = 0;
    range: number = 0;
    accuracy: number = 0;
    fireRate: number = 0;
}

export class WeaponStock extends WeaponComponent {
    bindTo = 'stock';
    accuracy: number = 0;
}

export class WeaponGrip extends WeaponComponent {
    bindTo = 'grip';
    accuracy: number = 0;
}

export class WeaponSights extends WeaponComponent {
    bindTo = 'sights';
    accuracy: number = 0;
}

export class Magasine extends WeaponComponent {
    bindTo = 'magasine';
    capacity: number = 1;
    ammoType: string = '';
    ammoLoaded: number = 0;
}
